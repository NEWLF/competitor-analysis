import { legacyRequester } from "../requester";

export async function fetchDBrands() {
  const res = await legacyRequester.get(`/filter/mx/dbrand`);
  return res.data;
}
