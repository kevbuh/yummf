import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
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
    id,
    authorId,
  } = JSON.parse(req.body);

  const ingredient_list_init: any[] = [];

  console.log("clicked");

  ingredient_list.map((d: any) => {
    // console.log("fff", d);
    // console.log("hhhh", d[0]);
    ingredient_list_init.push(JSON.stringify(d));
    // ingredient_list_init.push(d[1])
  });

  const updateRecipe = await prisma?.recipe.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      cookTime: cook_time,
      directions: directions,
      servingSize: serving,
      sourceURL: source_url,
      caption: caption,
      ingredientList: ingredient_list_init,
      authorId: authorId, // this need to be dynamically read
    },
  });

  return updateRecipe;
};
