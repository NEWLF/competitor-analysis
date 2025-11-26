import { executeProcedureRaw } from "./procedure";

export interface LFBrand {
  ORG4_NAME: string;
  ORG4_CODE: string;
}

export async function fetchLFBrands(): Promise<LFBrand[]> {
  const res = await executeProcedureRaw(
    "PKG_BI_MT_UI_FILTER.SP_COMPE_LF_BRNAD",
      {'': ''}
  );

  if (Array.isArray(res)) return res as LFBrand[];

  if (res && Array.isArray((res as any).list)) {
    return (res as any).list as LFBrand[];
  }

  return [];
}
