import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

interface Data {
  recipes: any[] | undefined;
  nextId: number | undefined;
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "GET") {
    const limit = 12;
    const cursor = req.query.cursor ?? "";
    const cursorObj =
      cursor === "" ? undefined : { id: parseInt(cursor as string, 10) };

    const recipes = await prisma?.recipe.findMany({
      skip: cursor !== "" ? 1 : 0,
      cursor: cursorObj,
      take: limit,
      orderBy: {
        // id: "desc",
        numSaves: "desc",
      },
    });
    return res.json({
      recipes,
      nextId: recipes?.length === limit ? recipes[limit - 1].id : undefined,
    });
  }
};
