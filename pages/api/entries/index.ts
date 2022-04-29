import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case "POST":
      return postEntry (req,res)

    default:
      return res.status(400).json({ message: "Endpoint not found" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();

  const entries = await Entry.find().sort({ createdAt: "ascending" });

  await db.disconnect();

  res.status(200).json(entries);
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ message: "Missing description" });
  }
  const newEntry = new Entry({ description, createdAt: new Date() });

  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();
    res.status(201).json(newEntry);

  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(500).json({ message: "Algo salio mal revisar consola del servidor" });
  }

}