import { Workbook } from "exceljs";
import { ExcelConfig } from "./types";
import {
  renderLandscapeNameCard,
  renderLandscapeTable,
  renderPortraitNameCard,
  renderPortraitTable,
} from "./render";

async function createExcelBuffer(
  sheetConfig: ExcelConfig["sheetConfig"]
): Promise<ArrayBuffer> {
  const workbook = new Workbook();

  for (const { sheetName, config: sheet } of sheetConfig) {
    const worksheet = workbook.addWorksheet(sheetName);

    for (const item of sheet) {
      let startRow = worksheet.rowCount > 0 ? worksheet.rowCount + 1 : 1;

      if (item.type === "gap") {
        worksheet.addRow("");
        continue;
      }

      if (item.type === "table") {
        if (item.orientation === "portrait") {
          startRow = await renderPortraitTable(
            workbook,
            worksheet,
            startRow,
            item.config,
            item.data
          );
        } else {
          startRow = await renderLandscapeTable(
            worksheet,
            startRow,
            item.config,
            item.data
          );
        }
        continue;
      }

      if (item.type === "nameCard") {
        if (item.orientation === "portrait") {
          startRow = await renderPortraitNameCard(
            worksheet,
            startRow,
            item.config,
            item.data
          );
        } else {
          startRow = await renderLandscapeNameCard(
            worksheet,
            startRow,
            item.config,
            item.data
          );
        }
      }
    }
  }

  return await workbook.xlsx.writeBuffer();
}

export { createExcelBuffer };
