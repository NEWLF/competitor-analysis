import { requester } from "../requester";

export async function remakeSummary(id: string) {
  await requester.post(`/summary/remake`, { summaryId: id });
}

export async function remakeAllSummary(id: string) {
  await requester.post(`/summary/remake-all`, { summaryId: id });
}
