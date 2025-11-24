export interface Filter {
  시작년월: { year: number, month: number };
  종료년월: { year: number, month: number };
  조직: string;
  경쟁사브랜드: string[] | "ALL";
  카테고리: string;
  소재: string;
  상품명: string;
}

export type Order =
  | "REG_DATE_DESC"
  | "POP_STCL_DESC"
  | "REP_SCORE_DESC"
  | "REP_SCORE_ASC"
  | "SALE_STCL_DESC"
  | "SALE_STCL_ASC";
