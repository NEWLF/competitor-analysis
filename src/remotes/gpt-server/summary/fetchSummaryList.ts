import { Summary } from "types/Summary";
import { requester } from "../requester";

export async function fetchSummaryList() {
  const res = await requester.get<Summary[]>("/summary/search");
  return res.data;
}
