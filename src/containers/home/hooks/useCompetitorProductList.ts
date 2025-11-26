import { useQuery } from "react-query";
import { CompetitorProduct, fetchCompetitorProductList } from "remotes/legacy";

export function useCompetitorProductList() {
  const filter = {
    시작년월: { year: 2022, month: 1 },
    종료년월: { year: 2025, month: 11 },
    조직: "G1_BPU03",
    경쟁사브랜드: ["ALL"],
    카테고리: "",
    소재: "",
    상품명: "",
  };

  return useQuery<CompetitorProduct[]>({
    queryKey: ["competitorProductList", filter],
    queryFn: () => fetchCompetitorProductList(filter),
    enabled: !!filter,
  });
}
