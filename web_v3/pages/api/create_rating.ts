import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const { values, recipeId } = JSON.parse(req.body);

  const createRating = await prisma?.rating.create({
    data: {
      recipeId: recipeId,
      authorId: values.userId,
    },
  });

  const updateRecipe = await prisma?.recipe.updateMany({
    where: {
      id: recipeId,
    },
    data: {
      overallRating: {
        increment: (values.qualityRating + values.tasteRating) / 2,
      },
      qualityRating: {
        increment: values.qualityRating,
      },
      tasteRating: {
        increment: values.tasteRating,
      },
    },
  });

  return res.status(201);
};
