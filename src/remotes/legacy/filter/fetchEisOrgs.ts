import { legacyRequester } from "../requester";

export async function fetchEisOrgs() {
  const res = await legacyRequester.get("/filter/eis/org");
  return res.data;
}
