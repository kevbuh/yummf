import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const {
    name,
    direction_list,
    source_url,
    serving,
    cook_time,
    caption,
    ingredient_list,
    id,
    authorId,
  } = JSON.parse(req.body);

  const ingredient_list_init: any[] = [];
  const direction_list_init: any[] = [];

  ingredient_list.map((d: any) => {
    ingredient_list_init.push(JSON.stringify(d));
  });

  direction_list.map((d: any) => {
    direction_list_init.push(JSON.stringify(d));
  });

  const updateRecipe = await prisma?.recipe.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      cookTime: cook_time,
      directions: direction_list_init,
      servingSize: serving,
      sourceURL: source_url,
      caption: caption,
      ingredientList: ingredient_list_init,
      authorId: authorId,
    },
  });

  if (updateRecipe?.id) {
    return res.status(201).json({ data: updateRecipe?.id });
  } else {
    return res.status(400).json({ data: 400 });
  }
};
