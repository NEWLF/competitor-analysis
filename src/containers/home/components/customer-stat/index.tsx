import { usePopup } from "@boxfoxs/bds-web";
import { useCallback } from "react";
import { CustomerStatModal } from "./CustomerStatModal";

export * from "./CustomerStatTable";

export function useCustomerStatTable() {
  const { open, close } = usePopup("customer-stat");
  return useCallback(() => {
    open({ children: <CustomerStatModal onClose={close} /> });
  }, [open, close]);
}
