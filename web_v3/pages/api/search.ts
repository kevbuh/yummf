import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

interface Data {
  searchResults: any[] | undefined;
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "GET") {
    const queryParam: string | string[] = req.query.q ?? "";
    let searchResults = null;

    const cat_search = queryParam.slice(0, 4) == "cat_";

    if (cat_search) {
      searchResults = await prisma?.category.findMany({
        where: {
          name: `${queryParam.slice(4, queryParam.length)}`,
        },
        select: {
          name: true,
          recipes: {
            select: {
              name: true,
              id: true,
              authorId: true,
            },
          },
        },
      });
    } else {
      searchResults = await prisma?.recipe.findMany({
        where: {
          name: {
            search: `${queryParam}`,
          },
        },
      });
    }

    return res.json({
      searchResults,
    });
  }
};
