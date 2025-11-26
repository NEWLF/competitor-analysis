import { first } from "lodash";
import { Filter } from "types/Filter";
import { executeProcedureWithFilter } from "./procedure";

export async function fetchLastUpdateDate(payload: Filter) {
  const res: LastUpdateDate[] = await executeProcedureWithFilter(
    "PKG_BI_MT_E_9331U.SP_BI_MT_E_9331_P3",
    payload
  );
  return first(res);
}

export interface LastUpdateDate {
  ANAL_DATE: string; //			-- 분석일자
}
