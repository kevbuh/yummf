import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const {
    name,
    directions,
    source_url,
    serving,
    cook_time,
    caption,
    ingredient_list,
    authorId,
  } = JSON.parse(req.body);

  const ingredient_list_init: any[] = [];

  ingredient_list.map((d: any) => {
    ingredient_list_init.push(JSON.stringify(d));
  });

  const createRecipe = await prisma?.recipe.create({
    data: {
      name: name,
      cookTime: cook_time,
      directions: directions,
      servingSize: serving,
      sourceURL: source_url,
      caption: caption,
      ingredientList: ingredient_list_init,
      authorId: authorId,
    },
  });

  return createRecipe;
};
