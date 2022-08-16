import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const { values } = JSON.parse(req.body);

  const createQuestion = await prisma?.question.create({
    data: {
      title: values.title,
      body: values.body,
      authorId: values.authorId,
      authorDisplayName: values.authorDisplayName,
    },
  });

  return res.status(201).json({ data: createQuestion?.id });
};
