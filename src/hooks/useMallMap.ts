import { fromPairs } from "lodash";
import { useQuery } from "react-query";
import { fetchMallList } from "remotes/gpt-server";

export function useMallMap() {
  const query = useQuery("mall-list", async () => {
    const list = await fetchMallList();
    return fromPairs(list.map((i) => [i.mallType, i.mallName]));
  });
  return query.data ?? {};
}
