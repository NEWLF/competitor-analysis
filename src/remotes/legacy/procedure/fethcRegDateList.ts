import { Filter } from "types/Filter";
import { executeProcedure } from "./procedure";
import { SourceReview } from "types/SoruceReview";

export async function fetchRegDateList(filter: Filter & { SCORE?: number }) {
  const res = await executeProcedure<RegDateData[]>(
    "PKG_BI_MT_E_9331U.SP_BI_MT_E_9331_P1",
    filter
  );
  return res.map(toReviewData);
}

interface RegDateData {
  MALL_NAME: "LFMALL";
  REVIEW_CONTENT: "빠른 배송해주셔서 감사합니다 ";
  REVIEW_DATE: "20240725";
  REVIEW_TITLE: "빠른 배송해주셔서 ...";
  SCORE: 5;
  STCL2_CODE: "HZTS4B437E1";
}

function toReviewData(data: RegDateData, idx: number): SourceReview {
  return {
    id: String(idx),
    review_id: idx,
    mall_code: data.MALL_NAME,
    stcl2_code: data.STCL2_CODE,
    title: data.REVIEW_TITLE,
    content: data.REVIEW_CONTENT,
    score: data.SCORE,
    calday: data.REVIEW_DATE,
  };
}
