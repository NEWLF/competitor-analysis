import { legacyRequester } from "../requester";

export async function fetchOrgs() {
  const res = await legacyRequester.get(`/filter/mx/org`);
  return res.data;
}
