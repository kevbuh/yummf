import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

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
  } = JSON.parse(req.body);

  const ingredient_list_init: any[] = [];

  ingredient_list.map((d: any) => {
    // console.log("fff", d);
    // console.log("hhhh", d[0]);
    ingredient_list_init.push(JSON.stringify(d));
    // ingredient_list_init.push(d[1])
  });

  const createRecipe = await prisma.recipe.create({
    data: {
      name: name,
      cookTime: cook_time,
      directions: directions,
      servingSize: serving,
      sourceURL: source_url,
      caption: caption,
      ingredientList: ingredient_list_init,
      authorId: "cl5rq9lvo0040nlv2wuf5lsgk", // this need to be dynamically read
    },
  });

  return createRecipe;
};
