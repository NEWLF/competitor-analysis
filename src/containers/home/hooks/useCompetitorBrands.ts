// src/containers/home/hooks/useCompetitorBrands.ts

import { useQuery } from "react-query";
import { CompetitorBrand, fetchCompetitorBrands } from "remotes/legacy";

export interface CompetitorBrandOption {
  id: string;
  label: string;
}

export function useCompetitorBrands() {
  return useQuery<CompetitorBrandOption[]>({
    queryKey: ["competitorBrandList"],
    queryFn: async () => {
      const rows: CompetitorBrand[] = await fetchCompetitorBrands();

      return rows.map((row) => ({
        id: row.COMPE_BRAND_CODE,
        label: row.COMPE_BRAND_NAME,
      }));
    },
  });
}
