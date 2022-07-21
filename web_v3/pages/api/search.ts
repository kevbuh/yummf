import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

interface Data {
  searchResults: any[];
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "GET") {
    const queryParam: string | string[] = req.query.q ?? "";

    const searchResults = await prisma.recipe.findMany({
      where: {
        name: {
          search: `${queryParam}`,
        },
      },
    });

    return res.json({
      searchResults,
    });
  }
};
