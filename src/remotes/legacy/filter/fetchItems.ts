import { legacyRequester } from "../requester";

export async function fetchItems() {
  const res = await legacyRequester.get<Item[]>("/filter/eis/item");
  return res.data;
}

export interface Item {
  id: string;
  name: string;
  parent: string;
  sortkey: string;
}
