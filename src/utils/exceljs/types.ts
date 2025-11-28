import type { AddWorksheetOptions, Column as ExcelColumn } from "exceljs";

export type Column = Omit<Partial<ExcelColumn>, "header" | "key"> & {
  header: string;
  key: string;
  numFmt?: string;
  dateFormat?: string;
  colspan?: number;
  rowspan?: number;
  height?: number;
  image?: boolean;
  children?: Column[][];
};

type Orientation = "portrait" | "landscape";

interface PortraitTableConfigItem {
  type: "table";
  orientation: "portrait";
  config: Column[];
  data: Record<string, any>[];
}

interface LandscapeTableConfigItem {
  type: "table";
  orientation: "landscape";
  config: Column[];
  data: Record<string, any>[];
}

interface PortraitNameCardConfigItem {
  type: "nameCard";
  orientation: "portrait";
  config: Column[][];
  data: Record<string, any>;
}

interface LandscapeNameCardConfigItem {
  type: "nameCard";
  orientation: "landscape";
  config: Column[][];
  data: Record<string, any>;
}

type ExcelConfigItem =
  | PortraitTableConfigItem
  | LandscapeTableConfigItem
  | PortraitNameCardConfigItem
  | LandscapeNameCardConfigItem
  | { type: "gap" };

type PageConfig = Partial<AddWorksheetOptions> & {
  fileName: string;
};

export interface ExcelConfig {
  pageConfig: PageConfig;
  sheetConfig: {
    sheetName: string;
    config: ExcelConfigItem[];
  }[];
}

export interface CellStyle {
  font?: { bold?: boolean; size?: number; color?: { argb: string } };
  alignment?: { vertical?: string; horizontal?: string };
  fill?: {
    type?: string;
    pattern?: string;
    fgColor?: { argb: string };
  };
  border?: {
    top?: { style: string };
    left?: { style: string };
    bottom?: { style: string };
    right?: { style: string };
  };
}
