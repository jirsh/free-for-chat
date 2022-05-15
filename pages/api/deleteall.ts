import { prisma } from "db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await prisma.message.deleteMany({});

  res.end();
}
