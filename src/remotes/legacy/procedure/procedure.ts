import { Filter } from "types/Filter";
import { legacyRequester } from "../requester";

export async function executeProcedureRaw<T = any>(
  procedure: string,
  payload: any
) {
  const res = await legacyRequester.post<T>(`/report/common/procedure`, {
    procedure,
    payload: [payload, "Y"],
  });

  return res.data;
}

export interface DashboardFilterPayload extends Filter {
  SCORE?: number;
}

function buildCommonFilterPayload(payload: DashboardFilterPayload) {
  return {
    FROM_YM: `${payload.시작년월.year}${String(payload.시작년월.month).padStart(
      2,
      "0"
    )}`,
    TO_YM: `${payload.종료년월.year}${String(payload.종료년월.month).padStart(
      2,
      "0"
    )}`,
    ORG_CODE: payload.조직,
    COMPE_CODE: payload.경쟁사브랜드,
    CATRGORT: payload.카테고리,
    MATERIAL_NAME: payload.소재,
    PROD_NAME: payload.상품명,
  } as const;
}

export async function executeProcedureWithFilter<T = any>(
  procedure: string,
  payload: DashboardFilterPayload
) {
  const builtPayload = buildCommonFilterPayload(payload);
  return executeProcedureRaw<T>(procedure, builtPayload);
}
