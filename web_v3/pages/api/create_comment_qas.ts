import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const { values, recipeId, userEmail } = JSON.parse(req.body);

  const user = await prisma?.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  const createComment = await prisma?.comment.create({
    data: {
      text: values.text,
      questionId: recipeId,
      authorId: user?.id as string, // this need to be dynamically read
      authorDisplayName: user?.displayName as string,
    },
  });

  if (createComment?.id) {
    return res.status(201).json({ data: 201 });
  } else {
    return res.status(400).json({ data: 400 });
  }
};
