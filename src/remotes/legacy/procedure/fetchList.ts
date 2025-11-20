import { Filter } from "types/Filter";
import { executeProcedure } from "./procedure";

export async function fetchSummaryList(filter: Filter) {
  const res: SummaryData[] = await executeProcedure(
    "PKG_BI_MT_E_9331U.SP_BI_MT_E_9331_M2",
    filter
  );
  return res;
}

export interface SummaryData {
  SUMMARY_ID: string;
  D_STCL: string; // -- 기준별 대표 STCL/ST
  IMG_URL: string; //  -- 이미지 호출 URL
  RV_MM: string; // -- 상품평수
  STCL_MM: string; //-- 기준별 STCL 수
  ST_MM: string; // -- 기준별 ST 수
  GPT_ANAL_GUBUN: string;
  GPT_ANAL_CODE: string;
  GR_STD_SB: string; // 	/ VT_JSON.AMTUNIT 	AS GR_STD_SB -- 입고
  SL_SD: string; //		/ VT_JSON.AMTUNIT	AS SL_SD -- 판매
  ONLINE_SL_SD: string; //	/ VT_JSON.AMTUNIT 	AS ONLINE_SL_SD -- 판매(온라인)
  STOCK_SB: string; //	/ VT_JSON.AMTUNIT	AS STOCK_SB -- 재고
  ON_STOCK_P: string; // 	/ VT_JSON.AMTUNIT	AS ON_STOCK_P -- 재고(온라인)
  UV_CNT: string; // -- UV
  PV_CNT: string; // -- PV
  CART_CNT: string; //-- 장바구니
  TOTAL_PAN: string; //-- 판매율
  CR: string; // -- C/R
  SUMM_CONTENT: string; // -- 총평
  SUMMARY_ITEM_ID: string; // --
  POSITIVE_CODE: string; // -- 긍/부정
  POSITIVE_SEQ: string; // -- 긍/부정 순서
  SUB_TITLE: string; // -- 긍부정 제목
  SUB_CONTENT: string; // -- 긍부정 내용
  POS_ENG_MM: string; // -- 긍부정 수
  RAT_POSITIVE: number; // -- 긍부정 비율
  AMT_UNIT: string; // --- 기준별 단위 결괏값
}
