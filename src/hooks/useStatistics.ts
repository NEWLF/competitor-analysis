import { useFilter, useTmpFilter } from "@/containers/home/hooks";
import { useQuery } from "react-query";
import { fetchRegDateList, fetchStatistics } from "remotes/legacy";
import { fetchSummaryList } from "remotes/legacy/procedure/fetchList";
import {fetchLastUpdateDate} from "../remotes/legacy/procedure/fetchLastUpdateDate";

export function useStatistics() {
  const [filter] = useFilter();
  return useQuery(["statistics2", filter], () => fetchStatistics(filter));
}

export function useLastUpdateDate() {
  const [filter] = useFilter();
  return useQuery(["lastUpdateDate", filter], () => fetchLastUpdateDate(filter));
}

// export function useSummaryList() {
//   const [filter] = useFilter();
//   return useQuery(["summaryList", filter], () => fetchSummaryList(filter), {
//     enabled: filter.order !== "REG_DATE_DESC",
//   });
// }

export function useRegDateOrderList() {
  const [filter] = useFilter();
  return useQuery(
    ["regDateOrderList", filter],
    () => fetchRegDateList(filter),
    { enabled: filter.order === "REG_DATE_DESC" }
  );
}
