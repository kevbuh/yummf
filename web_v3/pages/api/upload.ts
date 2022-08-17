import { NextApiRequest, NextApiResponse } from "next";
import { S3 } from "@aws-sdk/client-s3";
import { IncomingForm } from "formidable";
import fs from "fs";

// Imports your configured client and any necessary S3 commands.
import { PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3({
  endpoint: "https://sfo3.digitaloceanspaces.com",
  region: "us-west-1",
  credentials: {
    accessKeyId: process.env.SPACES_KEY as string,
    secretAccessKey: process.env.SPACES_SECRET as string,
  },
});

const asyncParse = (req: NextApiRequest) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

//set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const result1: any = await asyncParse(req);
  // console.log("result:", result1);

  const aws_key =
    result1.files.featured_image.originalFilename +
    "_" +
    result1.files.featured_image.newFilename;
  const aws_body = fs.createReadStream(result1.files.featured_image.filepath);

  // console.log("####", aws_body);

  // Specifies a path within your Space and the file to upload.
  const bucketParams = {
    Bucket: process.env.DO_SPACES_BUCKET,
    Key: aws_key, // file name
    Body: aws_body,
    ACL: "public-read",
    ContentType: "image/jpeg",
  };

  try {
    // const data = await s3Client.send(new PutObjectCommand(bucketParams));
    const data = await s3Client.putObject(bucketParams);
    // console.log(
    //   "Successfully uploaded object: " +
    //     bucketParams.Bucket +
    //     "/" +
    //     bucketParams.Key
    // );
    return res.status(201).json({ data: 201, img_url: aws_key });
  } catch (err) {
    console.log("Error uploading file", err);
    // put in json response
    return res.status(401).json({ data: 401 });
  }
};
