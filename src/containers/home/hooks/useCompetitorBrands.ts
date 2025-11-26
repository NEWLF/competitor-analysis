// src/containers/home/hooks/useCompetitorBrands.ts

import { useQuery } from "react-query";
import {
    fetchCompetitorBrands,
    CompetitorBrand,
} from "remotes/legacy/procedure/fetchCompetitorBrands";

export interface CompetitorBrandOption {
    id: string;
    label: string;
}

const FILTER = {
    시작년월: { year: 0, month: 0 },
    종료년월: { year: 0, month: 0 },
    조직: "G1_BPU03",
    경쟁사브랜드: ["ALL"],
    카테고리: "",
    소재: "",
    상품명: "",
};

export function useCompetitorBrands() {
    return useQuery<CompetitorBrandOption[]>({
        queryKey: ["competitorBrandList", FILTER],
        queryFn: async () => {
            const rows: CompetitorBrand[] = await fetchCompetitorBrands(FILTER);

            return rows.map((row) => ({
                id: row.COMPE_BRAND_CODE,
                label: row.COMPE_BRAND_NAME,
            }));
        },
    });
}
