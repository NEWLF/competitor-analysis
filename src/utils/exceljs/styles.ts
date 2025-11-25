import { CellStyle } from "./types";

const DEFAULT_COLUMN_WIDTH = 8;

const STYLES = {
  header: {
    font: { bold: true, size: 12 },
    alignment: { vertical: "middle", horizontal: "center" },
    border: {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    },
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD9D9D9" },
    },
  } as CellStyle,
  data: {
    font: { size: 12 },
    alignment: { vertical: "middle", horizontal: "center" },
    border: {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    },
  } as CellStyle,
};

const applyCellStyle = (cell: any, style: CellStyle) => {
  if (style.font) {
    cell.font = style.font as any;
  }
  if (style.alignment) {
    cell.alignment = style.alignment as any;
  }
  if (style.fill) {
    cell.fill = style.fill as any;
  }
  if (style.border) {
    cell.border = style.border as any;
  }
};

export { DEFAULT_COLUMN_WIDTH, STYLES, applyCellStyle };
