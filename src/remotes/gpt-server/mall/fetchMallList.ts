import { Mall } from "types/Mall";
import { requester } from "../requester";

export async function fetchMallList() {
  const res = await requester.get<Mall[]>("/mall");
  return res.data;
}
