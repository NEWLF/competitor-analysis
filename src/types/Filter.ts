export interface Filter {
  기준월: { year: number; month: number };
  조직: string;
  품목: string[] | "ALL";
  자사제휴몰: string[] | "ALL";
  정상재생산: string[] | "ALL";
  제품년도: number;
  시즌: string[] | "ALL";
  단위: string;
  STCL?: string;
  키워드?: string;
  order: Order;
  liveSTCL: string;
}

export type Order =
  | "REG_DATE_DESC"
  | "POP_STCL_DESC"
  | "REP_SCORE_DESC"
  | "REP_SCORE_ASC"
  | "SALE_STCL_DESC"
  | "SALE_STCL_ASC";
