import { prisma } from "db";
import { NextApiRequest, NextApiResponse } from "next";

type MessageType = {
  id: string;
  username: string;
  message: string;
  sent: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessageType[]>
) {
  const messages = await prisma.message.findMany({
    select: {
      id: true,
      message: true,
      sent: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { sent: "desc" },
    take: 10,
  });
  let ret: MessageType[] = [];
  messages.map((msg) => {
    ret.push({
      id: msg.id,
      username: msg.user.name || "Error",
      message: msg.message,
      sent: msg.sent.getTime(),
    });
  });
  res.send(ret);
}
