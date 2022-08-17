import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const { values, userEmail } = JSON.parse(req.body);

  const checkDisplayName = await prisma?.user.findMany({
    where: {
      displayName: values.displayName,
    },
  });

  console.log(checkDisplayName, checkDisplayName?.length == 0);

  if (checkDisplayName?.length == 0) {
    const updateUser = await prisma?.user.update({
      where: {
        email: userEmail,
      },
      data: {
        displayName: values.displayName,
      },
    });

    return res.status(201).json({ data: 201 });
  } else {
    return res.status(400).json({ data: 400 });
  }
};
