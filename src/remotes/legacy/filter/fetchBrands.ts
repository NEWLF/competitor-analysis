import { legacyRequester } from "../requester";

export async function fetchBrands(DBRAND_CODE: string) {
  const res = await legacyRequester.get(`/filter/mx/brand`, {
    params: { DBRAND_CODE },
  });
  return res.data;
}
