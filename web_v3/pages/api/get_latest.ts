import type { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient, Prisma } from "@prisma/client";

// const prisma = new PrismaClient();

import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(400).json({ error: "Method not allowed" });
  }

  // const latestRecipes = await prisma?.recipe.findMany();
  // console.log(latestRecipes);

  return null;
};
