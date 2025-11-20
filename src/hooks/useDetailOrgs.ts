import { useQuery } from "react-query";
import { fetchDetailOrgs } from "remotes/legacy";

export function useDetailOrgs() {
  return useQuery(["detail-orgs"], async () => {
    const list = await fetchDetailOrgs();
    return list.filter(
      (f) =>
        ["JH", "OR", "OU", "DY", "CE", "CD", "면세영업","라움워치","가두/면세"].includes(f.name) ===
        false
    );
  });
}
