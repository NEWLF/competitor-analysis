import { useQuery } from "react-query";
import { fetchDetailOrgs, fetchItems } from "remotes/legacy";

export function useItems() {
  return useQuery(["items"], async () => {
    return await fetchItems();
  });
}
