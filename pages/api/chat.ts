import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { NextApiResponseServerIO } from "types/next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  const session = await getSession({ req });
  if (req.method === "POST" && session) {
    // get message
    const message = req.body as string;
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || undefined },
    });

    if (user) {
      const msg = await prisma.message.create({
        data: {
          userId: user.id,
          message,
        },
      });

      // dispatch to channel "message"
      res?.socket?.server?.io?.emit("message", {
        id: msg.id,
        username: user.name,
        message: msg.message,
        sent: msg.sent.getTime(),
      });
    }

    // return message
    res.status(201).json(message);
  }
}
