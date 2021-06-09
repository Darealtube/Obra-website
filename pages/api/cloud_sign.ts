const cloudinary = require("cloudinary").v2;
import { NextApiResponse, NextApiRequest } from "next";

// This is the endpoint in which we send a POST to Cloudinary's API.
// It requires a signature and a timestamp because we are using a
// "signed" one.

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  // Must be UNIX format
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Signature
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET //API Secret (MUST BE HIDDEN IN ENV)
  );

  res.statusCode = 200;
  res.json({ signature, timestamp });
};
