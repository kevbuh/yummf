import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const { values, recipeId } = JSON.parse(req.body);

  const createRating = await prisma?.rating.create({
    data: {
      overallRating: values.overallRating,
      tasteRating: values.tasteRating,
      presentationRating: values.presentationRating,
      valueRating: values.valueRating,
      easeRating: values.easeRating,
      recipeId: recipeId,
      authorId: values.userId,
    },
  });

  return createRating;
};
