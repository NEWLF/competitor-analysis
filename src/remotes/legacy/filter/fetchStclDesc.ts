import { legacyRequester } from "../requester";

export async function fetchStclDesc(STCL_INPUT: string) {
  const res = await legacyRequester.post("/filter/mx/stcl/desc", {
    STCL_INPUT,
  });
  return res.data;
}
