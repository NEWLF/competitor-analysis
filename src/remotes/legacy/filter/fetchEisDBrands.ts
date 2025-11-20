import { legacyRequester } from "../requester";

export async function fetchEisDBrands() {
  const res = await legacyRequester.get(`/filter/eis/dbrand`);
  return res.data;
}
