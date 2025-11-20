import { usePopup } from "@boxfoxs/bds-web";
import { useCallback } from "react";
import { FilterModal } from "./FilterModal";

export function useFilterModal() {
  const { open, close } = usePopup("filter");

  return useCallback(
    (defaultTab?: string) => {
      open({
        children: (
          <FilterModal
            onClose={close}
            onConfirm={close}
            defaultTab={defaultTab}
          />
        ),
      });
    },
    [open, close]
  );
}
