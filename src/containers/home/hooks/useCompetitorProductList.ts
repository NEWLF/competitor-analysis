import { CompetitorProduct, fetchCompetitorProductList } from "remotes/legacy/procedure/fetchCompetitorProductList";
import { useFilter } from "./useFilterState";
import { useQuery } from "react-query";

export function useCompetitorProductList() {
  // const [filter] = useFilter();
  const filter = {
    시작년월: { year: 2022, month: 1},
    종료년월: { year: 2025, month: 11 },
    조직코드: "G1_BPU03",
    경장사브랜드: ["BP"],                              
    카테고리: "",
    소재: "",
    상품명: ""
  };

  return useQuery<CompetitorProduct[]>({
    queryKey: ["competitorProductList", filter],
    queryFn: () => fetchCompetitorProductList(filter),
    enabled: !!filter,
  });
}
