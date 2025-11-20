import { SourceReview } from "types/SoruceReview";
import { requester } from "../requester";

export async function fetchItemSourceReviewList(itemId: string, stcl?: string) {
  const res = await requester.get<SourceReview[]>("/summary/item/sources", {
    params: { itemId, stcl },
  });
  return res.data;
}
