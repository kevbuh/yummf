import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(400).json({ error: "Method not allowed" });
  }
};
