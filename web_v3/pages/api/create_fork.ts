import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const {
    name,
    cookTime,
    servingSize,
    caption,
    sourceURL,
    ingredientList,
    directions,
    authorId,
  } = JSON.parse(req.body);

  // console.log("vals", req.body);

  // const ingredient_list_init: any[] = [];
  // const direction_list_init: any[] = [];

  // ingredient_list.map((d: any) => {
  //   ingredient_list_init.push(JSON.stringify(d));
  // });

  // direction_list.map((d: any) => {
  //   direction_list_init.push(JSON.stringify(d));
  // });

  const createRecipe = await prisma?.recipe.create({
    data: {
      name: name,
      cookTime: cookTime,
      directions: directions,
      servingSize: servingSize,
      sourceURL: sourceURL,
      caption: caption,
      ingredientList: ingredientList,
      authorId: authorId,
    },
  });

  if (createRecipe?.id) {
    return res.status(201).json({ data: createRecipe?.id });
  } else {
    return res.status(400).json({ data: 400 });
  }
};
