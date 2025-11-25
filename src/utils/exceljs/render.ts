import { Workbook, Worksheet } from "exceljs";
import { applyCellStyle, DEFAULT_COLUMN_WIDTH, STYLES } from "./styles";
import { Column } from "./types";
import { parseDateValue } from "./date";

const IMAGE_DIMENSIONS = { width: 100.22, height: 127 };

function pxToPt(px: number): number {
  return px * 0.75; // 대략적 변환
}

async function convertImageUrlToBase64(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      // Blob을 Data URL로 변환
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("이미지 변환 오류:", error);
    throw error;
  }
}

async function insertImage(
  workbook: Workbook,
  worksheet: Worksheet,
  imageUrl: string,
  colIndex: number,
  rowIndex: number
): Promise<void> {
  try {
    const base64Image: any = await convertImageUrlToBase64(imageUrl);
    if (!base64Image) return;

    const image = workbook.addImage({
      base64: base64Image,
      extension: "jpeg",
    });

    worksheet.addImage(image, {
      tl: {
        col: colIndex - 0.88,
        row: rowIndex - 0.98,
      },
      ext: IMAGE_DIMENSIONS,
      editAs: "absolute",
    });

    const colObj = worksheet.getColumn(colIndex);
    colObj.width = IMAGE_DIMENSIONS.width / 7;
    const rowObj = worksheet.getRow(rowIndex);
    rowObj.height = pxToPt(IMAGE_DIMENSIONS.height);
  } catch (error) {
    console.error("이미지 처리 오류:", error);
  }
}

const setDataCellValue = (cell: any, col: Column, rawValue: any) => {
  if (rawValue === null || rawValue === undefined || rawValue === "") {
    cell.value = null;
    return;
  }

  // 1) dateFormat 우선 처리
  if (col.dateFormat) {
    const parsed = parseDateValue(rawValue, col.dateFormat);

    if (parsed) {
      cell.value = parsed; // 🎯 핵심: 우리가 만든 Date를 넣는다
      cell.numFmt = col.dateFormat; // 표시 포맷 적용
      return;
    }
  }

  // 2) 숫자/문자 그대로 처리
  cell.value = rawValue;

  if (col.numFmt) {
    cell.numFmt = col.numFmt;
  }
};

async function renderPortraitTable(
  workbook: Workbook,
  worksheet: Worksheet,
  startRow: number,
  config: Column[],
  data: Record<string, any>[]
): Promise<number> {
  const headerRowIndex = startRow;

  // 1) 헤더 행 채우기
  config.forEach((col, colIdx) => {
    const colIndex = colIdx + 1;
    const cell = worksheet.getCell(headerRowIndex, colIndex);

    cell.value = col.header;
    applyCellStyle(cell, STYLES.header);

    worksheet.getColumn(colIndex).width = col.width ?? DEFAULT_COLUMN_WIDTH;
  });

  // 2) 데이터 행 채우기
  for (let rowOffset = 0; rowOffset < data.length; rowOffset++) {
    const row = data[rowOffset];
    const rowIndex = headerRowIndex + 1 + rowOffset;

    for (let colIdx = 0; colIdx < config.length; colIdx++) {
      const col = config[colIdx];
      const colIndex = colIdx + 1;
      const cell = worksheet.getCell(rowIndex, colIndex);

      const value = row[col.key];

      if (col.image && value) {
        await insertImage(workbook, worksheet, value, colIndex, rowIndex);
      } else {
        setDataCellValue(cell, col, value);
      }

      applyCellStyle(cell, STYLES.data);
    }
  }

  const tableHeight = 1 + data.length;
  return headerRowIndex + tableHeight;
}

function renderLandscapeTable(
  worksheet: Worksheet,
  startRow: number,
  config: Column[],
  data: Record<string, any>[]
): number {
  const headerRowIndex = startRow;

  // 1) 헤더 행 채우기
  config.forEach((col, colIdx) => {
    const colIndex = colIdx + 1;
    const cell = worksheet.getCell(headerRowIndex, colIndex);

    cell.value = col.header;
    applyCellStyle(cell, STYLES.header);

    worksheet.getColumn(colIndex).width = col.width ?? DEFAULT_COLUMN_WIDTH;
  });

  // 2) 데이터 행 채우기
  data.forEach((row, rowOffset) => {
    const rowIndex = headerRowIndex + 1 + rowOffset;
    config.forEach((col, colIdx) => {
      const colIndex = colIdx + 1;
      const cell = worksheet.getCell(rowIndex, colIndex);

      const value = row[col.key];
      setDataCellValue(cell, col, value);
      applyCellStyle(cell, STYLES.data);
    });
  });

  const tableHeight = 1 + data.length;
  return headerRowIndex + tableHeight;
}

function renderPortraitNameCard(
  worksheet: Worksheet,
  startRow: number,
  config: Column[][],
  data: Record<string, any>
): number {
  const startRowIndex = startRow;

  config.forEach((row, rowIdx) => {
    const rowIndex = startRowIndex + rowIdx * 2;

    row.forEach((col, colIdx) => {
      const colIndex = colIdx + 1;
      const headerCell = worksheet.getCell(rowIndex, colIndex);
      headerCell.value = col.header;
      applyCellStyle(headerCell, STYLES.header);

      worksheet.getColumn(colIndex).width = col.width ?? DEFAULT_COLUMN_WIDTH;

      const cell = worksheet.getCell(rowIndex + 1, colIndex);
      const value = data[col.key];
      setDataCellValue(cell, col, value);
      applyCellStyle(cell, STYLES.data);
    });
  });

  const NameCardHeight = config.length;
  return startRow + NameCardHeight * 2;
}

function renderLandscapeNameCard(
  worksheet: Worksheet,
  startRow: number,
  config: Column[][],
  data: Record<string, any>
): number {
  const startRowIndex = startRow;

  config.forEach((row, rowIdx) => {
    const rowIndex = startRowIndex + rowIdx;

    row.forEach((col, colIdx) => {
      const colIndex = colIdx * 2 + 1;
      const headerCell = worksheet.getCell(rowIndex, colIndex);
      headerCell.value = col.header;
      applyCellStyle(headerCell, STYLES.header);

      worksheet.getColumn(colIndex).width = col.width ?? DEFAULT_COLUMN_WIDTH;

      const cell = worksheet.getCell(rowIndex, colIndex + 1);
      const value = data[col.key];
      setDataCellValue(cell, col, value);
      applyCellStyle(cell, STYLES.data);
    });
  });

  const NameCardHeight = config.length;
  return startRow + NameCardHeight;
}

export {
  renderPortraitTable,
  renderLandscapeTable,
  renderPortraitNameCard,
  renderLandscapeNameCard,
};
