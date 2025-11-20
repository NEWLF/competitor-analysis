import { useFilter, useTmpFilter } from "@/containers/home/hooks";
import { useQuery } from "react-query";
import { fetchCustomerData } from "remotes/legacy";

export function useCustomerData() {
  const [filter] = useFilter();
  const query = useQuery(["customer-data", filter], async () => {
    return await fetchCustomerData(filter);
  });
  return query;
}
