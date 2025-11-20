import { legacyRequester } from "../requester";

export async function fetchStyleCode(STCL_INPUT: string) {
  const res = await legacyRequester.post<{ STCL: string; URL: string }[]>(
    "/filter/eis/stcl",
    {
      STCL_INPUT,
    }
  );
  return res.data;
}
