const cloudinary = require("cloudinary").v2;
import { NextApiResponse, NextApiRequest } from "next";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  // Must be UNIX format
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Signature
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    "HYbaYazvnM4RewXbhwj3i_3NgdQ" //API Secret (MUST BE HIDDEN IN ENV)
  );

  res.statusCode = 200;
  res.json({ signature, timestamp });
};
