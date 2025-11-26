import { SetStateAction, useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import { Filter } from "types/Filter";

const isNoSeasonYear = (조직) => ["G1_BPU78", "CB", "CJ"].includes(조직);

const day = new Date().getDate();
const now_month = new Date().getMonth() + 1;
const month = day === 1 ? (now_month - 1 === 0 ? 12 : now_month - 1) : now_month;
const year = new Date().getFullYear();

const DEFAULT_FILTER_STATE: Filter = {
  시작년월: { year, month },
  종료년월: { year, month },
  조직: "G1_BPU03",
  경쟁사브랜드: ["BP"],
  카테고리: "",
  소재: "",
  상품명: "",
};

/** 🔥 atom들은 가장 위에서 최초 1회만 평가되도록 배치 */
export const filterState = atom<Filter>({
  key: "filter-state",
  default: { ...DEFAULT_FILTER_STATE },
});

export const tmpFilterState = atom<Filter>({
  key: "tmp-filter-state",
  default: { ...DEFAULT_FILTER_STATE },
});

/** 아래부터는 hook */
export function useFilterState(
    value: Filter,
    update: (state: SetStateAction<Filter>) => void
) {
  const dispatch = useCallback(
      (state: Partial<Filter>) => {
        update((prev) => {

          const newState = { ...prev, ...state };

          if (isNoSeasonYear(newState.조직) && prev.조직 !== newState.조직) {
            return { ...newState, 제품년도: 9999, 시즌: ["X"] };
          } else if (isNoSeasonYear(prev.조직) && prev.조직 !== newState.조직) {
            return {
              ...newState,
            };
          }

          return newState;
        });
      },
      [update]
  );

  return [value, dispatch, update] as const;
}

export function useFilter() {
  const [value, update] = useRecoilState(filterState);
  return useFilterState(value, update);
}

export function useTmpFilter() {
  const [value, update] = useRecoilState(tmpFilterState);
  return useFilterState(value, update);
}
