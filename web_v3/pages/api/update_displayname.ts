import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const { values, userEmail } = JSON.parse(req.body);

  const updateUser = await prisma?.user.update({
    where: {
      email: userEmail,
    },
    data: {
      displayName: values.displayName,
    },
  });

  if (updateUser) {
    return res.status(201).json({ data: updateUser });
  } else {
    return res.status(400).json({ data: 400 });
  }
};
