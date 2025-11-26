import { useQuery } from "react-query";
import { CompetitorProduct, fetchCompetitorProductList } from "remotes/legacy";
import { useFilter } from "./useFilterState";

export function useCompetitorProductList() {
  const [filter] = useFilter();

  return useQuery<CompetitorProduct[]>({
    queryKey: ["competitorProductList", filter],
    queryFn: () => fetchCompetitorProductList(filter),
    enabled: !!filter,
  });
}
