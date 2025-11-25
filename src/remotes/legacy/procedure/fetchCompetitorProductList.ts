import { Filter } from "types/Filter";
import { executeProcedure } from "./procedure";

export async function fetchCompetitorProductList(filter: Filter) {
  const res = await executeProcedure(
    "PKG_BI_MT_E_9121U.SP_BI_MT_E_9121_M1",
    filter
  );
  return res as CompetitorProduct[];
}

export interface CompetitorProduct {
  CALMONTH: string; // 기준월
  COMPE_ST_CODE: string; // 경쟁사 ST 코드
  PROD_ST_NAME: string; // 상품명
  COMPE_BRAND_NAME: string; // 브랜드
  ORIGINAL_PRICE: number; // 정상가
  DISCOUNT_PRICE: number; // 할인가
  FIT_INFO?: string; // 핏 정보
  ORIGIN_INFO?: string; // 원산지
  MIN_CALDAY: string; // 최초수집일
  SIZE_OPTIONS?: string; // 사이즈 정보
  MATERIAL_INFO?: string; // 소재
  MIX_RATIO_INFO?: string; // 혼용율

  // 이미지 정보
  IMG_RNK: number; // 이미지 순서(아더컬러 포함) - 1번이 대표 이미지
  COLOR_OPTIONS_URL: string; // 이미지 URL(누끼 이미지)
  COMPE_SITE_URL: string; // 경쟁사 사이트 URL
  OUTER_IMG_CNT?: number; // 아더컬러 수
  ST_RNK?: number; // 전체 제품 정렬 순서
}
