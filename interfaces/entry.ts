export type EntryStatus =  "pending" | "finished" | "in-progress";

export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: EntryStatus;
}
