import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

interface Data {
  searchResults: any[] | undefined;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "GET") {
    const queryParam: string | string[] = req.query.q ?? "";
    let searchResults = null;

    const cat_search = queryParam.slice(0, 4) == "cat_";
    const ing_search = queryParam.slice(0, 4) == "ing_";
    const qas_search = queryParam.slice(0, 4) == "qas_";

    const search_query: string | string[] = queryParam.slice(
      4,
      queryParam.length
    );

    if (cat_search) {
      searchResults = await prisma?.category.findMany({
        where: {
          name: capitalizeFirstLetter(search_query as string),
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
    } else if (ing_search) {
      searchResults = await prisma?.ingredient.findMany({
        where: {
          name: {
            contains: capitalizeFirstLetter(search_query as string),
          },
        },
      });
    } else if (qas_search) {
      searchResults = await prisma?.question.findMany({
        where: {
          title: {
            contains: search_query as string,
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
