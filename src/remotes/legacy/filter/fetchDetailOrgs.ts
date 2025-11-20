import { legacyRequester } from "../requester";

export async function fetchDetailOrgs() {
  const res = await legacyRequester.get<DetailOrg[]>(
    "/filter/mx/org/dashboard"
  );
  return res.data;
}

export interface DetailOrg {
  OBJ_LVL: string;
  ORG2_CODE: string;
  ORG2_SORTKEY: string;
  ORG3_CODE: string;
  ORG3_SORTKEY: string;
  ORG4_CODE: string;
  ORG4_SORTKEY: string;
  id: string;
  name: string;
  parent: string;
}
