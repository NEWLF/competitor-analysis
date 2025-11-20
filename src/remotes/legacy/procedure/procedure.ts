import { Filter } from "types/Filter";
import { legacyRequester } from "../requester";
import { flatMap } from "lodash";

export interface Payload extends Filter {
  SCORE?: number;
}

export async function executeProcedure<T = any>(procedure, payload: Payload) {
  const res = await legacyRequester.post<T>(`/report/common/procedure`, {
    procedure,
    payload: [
      {
        MONTH: `${payload.기준월.year}${String(payload.기준월.month).padStart(
          2,
          "0"
        )}`,
        MONTH_TEXT: `${payload.기준월.year}/${String(
          payload.기준월.month
        ).padStart(2, "0")}`,
        ORG_CODE: payload.조직,
        ITEM_CODE: flatMap([payload.품목]),
        CHN_GRP2_CODE: flatMap([payload.자사제휴몰]),
        NEW_NORMAL_CODE: flatMap([payload.정상재생산]),
        PROD_YEAR: String(payload.제품년도),
        SEASON_CODE: flatMap([payload.시즌]),
        STCL_INPUT: payload.STCL || "",
        KEYWORD_TEXT: payload.키워드 || "",
        AMTUNIT: "1000000",
        VIEW_LIVE_STCL: payload.liveSTCL,
        SORTING: payload.order,
        SCORE: payload.SCORE,
      },
      "Y",
    ],
  });
  return res.data;
}
