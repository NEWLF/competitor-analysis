import { requester } from "../requester";

export async function fetchExcelData(
  기준월: { year: number; month: number },
  summaryId: string,
  summaryItemId?: string
) {
  const res = await requester.get(`/summary/excel`, {
    params: {
      기준월: `${기준월.year}${기준월.month.toString().padStart(2, "0")}`,
      summaryId,
      summaryItemId,
    },
  });
  return res.data;
}
