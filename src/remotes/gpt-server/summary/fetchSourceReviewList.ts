import { SourceReview } from "types/SoruceReview";
import { requester } from "../requester";

export async function fetchSourceReviewList(
  id?: string,
  itemId?: string,
  stcl?: string //20250124ljy
) {
  const res = await requester.get<SourceReview[]>("/summary/sources", {
    params: { id, itemId, stcl }, //20250124ljy
  });
  return res.data;
}
