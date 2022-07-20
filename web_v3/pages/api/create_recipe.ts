import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const { name, directions, source_url, serving, cook_time, caption } =
    JSON.parse(req.body);

  const createRecipe = await prisma.recipe.create({
    data: {
      name: name,
      cookTime: cook_time,
      directions: directions,
      servingSize: serving,
      sourceURL: source_url,
      caption: caption,
      authorId: "cl5rq9lvo0040nlv2wuf5lsgk", // this need to be dynamically read
    },
  });

  return createRecipe;
};
