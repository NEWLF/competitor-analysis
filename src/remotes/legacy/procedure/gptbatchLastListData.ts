import { Filter } from "types/Filter";
import { executeProcedure } from "./procedure";

export async function gptbatchLastListData(filter: Filter) {
  const res: SummaryData[] = await executeProcedure(
      "PKG_BI_MT_A_0005U.SP_GPT_REVIEW_REANAL_UI",
      filter
  );
  return res;
}

export interface SummaryData {
  SUMMARY_ID: string;
}
