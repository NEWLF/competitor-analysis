import { SetStateAction, useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import { Filter } from "types/Filter";

const isNoSeasonYear = (조직) => ["G1_BPU78", "CB", "CJ"].includes(조직);

const day = new Date().getDate();
const now_month = new Date().getMonth() + 1;
const month = day === 1 ? (now_month - 1 === 0 ? 12 : now_month - 1) : now_month;
const year = new Date().getFullYear();

const DEFAULT_FILTER_STATE: Filter = {
  기준월: { year, month },
  조직: "G1_BPU03",
  품목: "ALL",
  자사제휴몰: "ALL",
  정상재생산: "ALL",
  제품년도: month <= 2 ? year - 1 : year,
  시즌: [3, 4, 5, 6, 7, 8].includes(month) ? ["A", "B", "E"] : ["C", "D", "F"],
  단위: "1000000",
  order: "REP_SCORE_DESC",
  liveSTCL: "N",
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
          if (state.시즌?.length === 0) state.시즌 = ["A"];

          const newState = { ...prev, ...state };

          if (isNoSeasonYear(newState.조직) && prev.조직 !== newState.조직) {
            return { ...newState, 제품년도: 9999, 시즌: ["X"] };
          } else if (isNoSeasonYear(prev.조직) && prev.조직 !== newState.조직) {
            return {
              ...newState,
              제품년도: DEFAULT_FILTER_STATE.제품년도,
              시즌: DEFAULT_FILTER_STATE.시즌,
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
