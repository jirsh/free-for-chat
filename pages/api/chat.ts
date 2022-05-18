import { prisma } from "db";
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { NextApiResponseServerIO } from "types/next";
import cuid from "cuid";

const handleCommands = async (
  message: string,
  res: NextApiResponseServerIO
): Promise<boolean> => {
  const splitMsg = message.split(" ");
  const cmd = splitMsg[0].toLowerCase();
  switch (cmd) {
    case "/clear": {
      res.socket.server.io.emit("clear_messages");

      return true;
    }
    case "/deleteall": {
      await prisma.message.deleteMany({});

      res.socket.server.io.emit("clear_messages");

      return true;
    }
    case "/ping": {
      res.socket.server.io.emit("message", {
        id: cuid(),
        username: "SYSTEM",
        message: "pong",
        sent: new Date().getTime(),
      });

      return true;
    }
    case "/random": {
      if (splitMsg.length !== 3) {
        res.socket.server.io.emit("message", {
          id: cuid(),
          username: "SYSTEM",
          message: "invalid command arguments",
          sent: new Date().getTime(),
        });

        return true;
      }

      const min = +splitMsg[1];
      const max = +splitMsg[2];
      const num = Math.floor(Math.random() * (max - min + 1) + min);

      res.socket.server.io.emit("message", {
        id: cuid(),
        username: "SYSTEM",
        message: `Random number generated: ${num}`,
        sent: new Date().getTime(),
      });

      return true;
    }
  }
  return false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!req.method || (req.method !== "POST" && req.method !== "DELETE"))
    return res.status(400).json({
      error: true,
      message: "Invalid HTTP method. Expected POST or DELETE",
    });

  const session = await getSession({ req });
  if (req.method === "POST" && session) {
    // get message
    const message = req.body as string;
    if (!message.length)
      return res
        .status(400)
        .json({ error: true, message: "Message length invalid" });

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || undefined },
    });

    if (user) {
      if (await handleCommands(message, res)) return res.status(201).end();

      const msg = await prisma.message.create({
        data: {
          userId: user.id,
          message,
        },
      });

      // dispatch to channel "message"
      res.socket.server.io.emit("message", {
        id: msg.id,
        username: user.name,
        message: msg.message,
        sent: msg.sent.getTime(),
      });
    }

    // return message
    res.status(201).end();
  } else if (req.method === "DELETE" && session) {
    const id = req.body as string;

    try {
      await prisma.message.delete({ where: { id } });
    } catch (e) {
    } finally {
      res.socket.server.io.emit("delete_message_by_id", id);
    }

    res.end();
  }
}
