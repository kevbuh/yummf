import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const limit = 5;
  const cursor = req.query.cursor ?? "";

  const cursorObj =
    cursor === "" ? undefined : { id: parseInt(cursor as string) };

  const infiniteRecipes = await prisma?.recipe.findMany({
    take: limit,
    cursor: cursorObj,
    skip: cursor === "" ? 0 : 1,
  });

  return res.json({
    infiniteRecipes,
    nextId:
      infiniteRecipes?.length === limit
        ? infiniteRecipes[limit - 1].id
        : undefined,
  });
};
