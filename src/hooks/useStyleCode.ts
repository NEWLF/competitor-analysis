import { useQuery } from "react-query";
import { fetchStyleCode } from "remotes/legacy";

export function useStyleCode(stclInput?: string) {
  return useQuery(["stcl", stclInput], () => fetchStyleCode(stclInput), {
    enabled: !!stclInput && stclInput.length >= 4,
  });
}
