import { withProps } from "@/components/hocs";
import { liveSTCL, MALL_LIST, NORMAL_LIST, UNITS } from "constants/options";
import { SelectList, SingleSelectList } from "./SelectList";

export const MallTypePicker = withProps(SelectList, { items: MALL_LIST });
export const NormalPicker = withProps(SelectList, {
  items: NORMAL_LIST,
  checkbox: true,
  center: false,
});
export const UnitPicker = withProps(SingleSelectList, { items: UNITS });
export const LiveSTCLPicker = withProps(SingleSelectList, { items: liveSTCL });


