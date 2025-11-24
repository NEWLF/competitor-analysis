import { requester } from "../requester";

export async function fetchExcelData(
  시작년월: { year: number; month: number },
  summaryId: string,
  summaryItemId?: string
) {
  const res = await requester.get(`/summary/excel`, {
    params: {
      시작년월: `${시작년월.year}${시작년월.month.toString().padStart(2, "0")}`,
      summaryId,
      summaryItemId,
    },
  });
  return res.data;
}
