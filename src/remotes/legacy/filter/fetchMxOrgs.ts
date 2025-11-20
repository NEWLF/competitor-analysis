import { legacyRequester } from "../requester";

export async function fetchMxOrg() {
  const res = await legacyRequester.get("/filter/mx/org/dashboard/mx");
  return res.data;
}
