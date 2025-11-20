import { first } from "lodash";
import { Filter } from "types/Filter";
import { executeProcedure } from "./procedure";

export async function fetchStatistics(payload: Filter) {
  const res: Statistics[] = await executeProcedure(
    "PKG_BI_MT_E_9331U.SP_BI_MT_E_9331_M1",
    payload
  );
  return first(res);
}

export interface Statistics {
  ANAL_DATE: string; //			-- 분석일자
  GPT_ANAL_GUBUN: string; //		-- 븐석 구분
  RV_PT_MM_AVG: number; //		-- 평균 별점
  TOT_RV_MM: string;
  RV_5P_MM: number; //			-- 별점 5점
  RV_4P_MM: number; //			-- 별점 4점
  RV_3P_MM: number; //			-- 별점 3점
  RV_2P_MM: number; //			-- 별점 2점
  RV_1P_MM: number; //			-- 별점 1점
  RV_MM: string; //				-- 리뷰수
  STCL_MM: string; //			-- 스타일 / 스타일칼라수
  RV_W00: string; //				-- W  ( 주차 )
  RV_W01: string; //				-- W1  ( 1주차 )
  RV_W02: string; //				-- W2  ( 1주차 )
  RV_W03: string; //				-- W3  ( 1주차 )
  RV_W04: string; //				-- W4  ( 1주차 )
  RV_W05: string; //				-- W5  ( 1주차 )
  EM_TOT: string; //				-- EMOTION  전체 리뷰수
  EM_POS_MM: number; //			-- EMOTION  긍정 리뷰수
  EM_NEG_MM: number; //			-- EMOTION  부정 리뷰수
  EM_POS_RAT: number; //			-- EMOTION  긍정 비율
  EM_NEG_RAT: number; //			-- EMOTION  부정 비율
}
