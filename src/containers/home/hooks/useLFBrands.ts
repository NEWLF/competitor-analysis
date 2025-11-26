import { useQuery } from "react-query";
import { LFBrand, fetchLFBrands } from "remotes/legacy/procedure/fetchLFBrands";

export interface LFBrandOption {
  id: string;
  label: string;
}

export function useLFBrands() {
  return useQuery<LFBrandOption[]>({
    queryKey: ["LFBrandList"],
    queryFn: async () => {
      const rows: LFBrand[] = await fetchLFBrands();

      return rows.map((row) => ({
        id: row.ORG4_CODE,
        label: row.ORG4_NAME,
      }));
    },
  });
}
