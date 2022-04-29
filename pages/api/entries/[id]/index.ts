import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log(req.query)
  // const { id } = req.query;
  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).json({ message: "El id no es valido " + id });
  // }
  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: "Endpoint not found" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "No se encontro la entrada" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }

  // entryToUpdate.description = description;
  // entryToUpdate.status = status;    otra forma de hacerlo
  // await entryToUpdate.save()
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const entryGet = await Entry.findById(id);
    await db.disconnect();
    if (!entryGet) {
      return res.status(400).json({ message: "No se encontro la entrada" });
    }
    return res.status(200).json(entryGet);
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const entryToDelete = await Entry.findById(id);
    if (!entryToDelete) {
      await db.disconnect();
      return res.status(400).json({ message: "No se encontro la entrada" });
    }
    await entryToDelete.remove();
    await db.disconnect();
    return res.status(200).json({ message: "Entrada eliminada" });
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
