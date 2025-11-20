import { Filter } from "types/Filter";
import { executeProcedure } from "./procedure";

export async function fetchCustomerData(filter: Filter) {
  const res = await executeProcedure(
    "PKG_BI_MT_E_9331U.SP_BI_MT_E_9331_P2",
    filter
  );
  return res as CustomerData[];
}

export interface CustomerData {
  A20_MM: 0;
  A30_MM: 3;
  A35_MM: 5;
  A40_MM: 8;
  A45_MM: 14;
  A50_MM: 22;
  A55_MM: 18;
  A60_MM: 0;
  A65_MM: 0;
  A70_MM: 2;
  SEX_CODE: 2;
  SEX_GB: "여자";
  TOT_AGE_CNT: 72;
}
