import { useQuery } from "react-query";
import { fetchItemSourceReviewList } from "remotes/gpt-server";

export function useItemSourceReviewList(itemId: string) {
  return useQuery(["summary-item-source-review", itemId], () =>
    fetchItemSourceReviewList(itemId)
  );
}
