import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const deleteRecipe = await prisma?.recipe.delete({
    where: {
      id: JSON.parse(req.body),
    },
  });

  return deleteRecipe;
};
