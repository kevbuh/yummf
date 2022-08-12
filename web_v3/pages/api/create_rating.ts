import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method not allowed" });
  }

  console.log("here 1.5");

  const { values, recipeId } = JSON.parse(req.body);

  console.log(values);

  const createRating = await prisma?.rating.create({
    data: {
      recipeId: recipeId,
      authorId: values.userId,
    },
  });

  const updateRecipe = await prisma?.recipe.updateMany({
    data: {
      overallRating: {
        increment: values.overallRating,
      },
      qualityRating: {
        increment: values.qualityRating,
      },
      tasteRating: {
        increment: values.tasteRating,
      },
    },
  });

  return 201;
};
