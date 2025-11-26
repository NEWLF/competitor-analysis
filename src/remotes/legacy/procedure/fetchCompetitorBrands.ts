// remotes/legacy/procedure/fetchCompetitorBrands.ts

import { Filter } from "types/Filter";
import { executeProcedure } from "./procedure";

export interface CompetitorBrand {
    COMPE_BRAND_CODE: string;   // 경쟁사 코드
    COMPE_BRAND_NAME: string;   // 경쟁사 명
}

export async function fetchCompetitorBrands(filter: Filter): Promise<CompetitorBrand[]> {
    const res = await executeProcedure(
        "PKG_BI_MT_UI_FILTER.SP_COMPE_BRNAD",
        filter
    );

    if (Array.isArray(res)) return res as CompetitorBrand[];

    if (res && Array.isArray((res as any).list)) {
        return (res as any).list as CompetitorBrand[];
    }

    return []; // 안전
}
