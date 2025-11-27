import { Workbook, Worksheet } from "exceljs";
import { applyCellStyle, DEFAULT_COLUMN_WIDTH, STYLES } from "./styles";
import { Column } from "./types";
import { parseDateValue } from "./date";

// 원본 이미지 크기(px)
const IMAGE_DIMENSIONS = { width: 100.22, height: 127 };

// 썸네일 스케일 (2배 작게)
const THUMB_SCALE = 1 / 2;

// 썸네일 크기(px)
const THUMB_DIMENSIONS = {
  width: IMAGE_DIMENSIONS.width * THUMB_SCALE,
  height: IMAGE_DIMENSIONS.height * THUMB_SCALE,
};

function pxToPt(px: number): number {
  return px * 0.75;
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
  rowIndex: number,
  size
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
      ext: size,
      editAs: "absolute",
    });

    const colObj = worksheet.getColumn(colIndex);
    colObj.width = size.width / 7;
    const rowObj = worksheet.getRow(rowIndex);
    rowObj.height = pxToPt(IMAGE_DIMENSIONS.height);
    // 높이는 pt
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
      cell.value = parsed;
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

function expandMultiImageColumns(config, rowData) {
  const expandedConfig = [];

  config.forEach((col) => {
    if (col.image !== "multi") {
      expandedConfig.push(col);
      return;
    }

    const value = rowData[col.key];
    const count = Array.isArray(value) ? value.length : 0;

    if (count === 0) {
      // 데이터가 없을 때도 1개는 생성 (원하면 제거 가능)
      expandedConfig.push({
        ...col,
        key: `${col.key}_0`,
        image: true,
        colSpan: 1,
      });
      return;
    }

    for (let i = 0; i < count; i++) {
      expandedConfig.push({
        ...col,
        key: `${col.key}_${i}`,
        image: true,
        colSpan: i === 0 ? count : undefined, // 0번째만 colSpan 적용
      });
    }
  });

  return expandedConfig;
}

function mapMultiImageRowData(row, config) {
  const newRow = { ...row };

  config.forEach((col) => {
    if (col.image === "multi") {
      const arr = row[col.key];
      if (Array.isArray(arr)) {
        arr.forEach((item, index) => {
          newRow[`${col.key}_${index}`] = item;
        });
      }
      delete newRow[col.key]; // 원래 key 제거 (원하면 삭제 안 해도 가능)
    }
  });

  return newRow;
}

async function renderPortraitTable(
  workbook: Workbook,
  worksheet: Worksheet,
  startRow: number,
  config: Column[],
  data: Record<string, any>[]
): Promise<number> {
  const headerRowIndex = startRow;

  data = data.map((v) => ({
    ...v,
    PROD_COLOR_NAME: [
      v.COLOR_IMG_URL,
      v.COLOR_IMG_URL,
      v.COLOR_IMG_URL,
      v.COLOR_IMG_URL,
      v.COLOR_IMG_URL,
    ],
  }));

  // 1) 헤더 행 채우기
  const mappedData = data.map((row) => mapMultiImageRowData(row, config));
  const finalConfig = expandMultiImageColumns(config, data[0]);

  finalConfig.forEach((col, colIdx) => {
    const colIndex = colIdx + 1;
    const cell = worksheet.getCell(headerRowIndex, colIndex);

    cell.value = col.header;
    applyCellStyle(cell, STYLES.header);
    if (col?.colSpan) {
      worksheet.mergeCells([
        headerRowIndex,
        colIndex,
        headerRowIndex,
        colIndex + col?.colSpan - 1,
      ]);
    }
    worksheet.getColumn(colIndex).width = col.width ?? DEFAULT_COLUMN_WIDTH;
  });

  // 2) 데이터 행 채우기
  for (let rowOffset = 0; rowOffset < mappedData.length; rowOffset++) {
    const row = mappedData[rowOffset];
    const rowIndex = headerRowIndex + 1 + rowOffset;

    for (let colIdx = 0; colIdx < finalConfig.length; colIdx++) {
      const col = finalConfig[colIdx];
      const colIndex = colIdx + 1;
      const cell = worksheet.getCell(rowIndex, colIndex);

      const value = row[col.key];

      if (col.image && value) {
        await insertImage(
          workbook,
          worksheet,
          value,
          colIndex,
          rowIndex,
          col?.size || IMAGE_DIMENSIONS
        );
      } else {
        setDataCellValue(cell, col, value);
      }

      applyCellStyle(cell, STYLES.data);
    }
  }

  const tableHeight = 1 + mappedData.length;
  return headerRowIndex + tableHeight;
}

async function renderLandscapeTable(
  workbook: Workbook,
  worksheet: Worksheet,
  startRow: number,
  config: Column[],
  data: Record<string, any>[]
): Promise<number> {
  const headerRowIndex = startRow;

  // 1) 헤더 행 채우기 (동기 루프)
  config.forEach((col, colIdx) => {
    const colIndex = colIdx + 1;
    const cell = worksheet.getCell(headerRowIndex, colIndex);
    cell.value = col.header;
    applyCellStyle(cell, STYLES.header);
    worksheet.getColumn(colIndex).width = col.width ?? DEFAULT_COLUMN_WIDTH;
  });

  // 2) 데이터 행 채우기 (비동기 루프)
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

async function renderPortraitNameCard(
  workbook: Workbook,
  worksheet: Worksheet,
  startRow: number,
  config: Column[][],
  data: Record<string, any>
): Promise<number> {
  const startRowIndex = startRow;

  for (let rowIdx = 0; rowIdx < config.length; rowIdx++) {
    const row = config[rowIdx];
    const rowIndex = startRowIndex + rowIdx * 2;

    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      const col = row[colIdx];
      const colIndex = colIdx + 1;

      // 헤더 셀 처리
      const headerCell = worksheet.getCell(rowIndex, colIndex);
      headerCell.value = col.header;
      applyCellStyle(headerCell, STYLES.header);

      worksheet.getColumn(colIndex).width = col.width ?? DEFAULT_COLUMN_WIDTH;

      // 데이터 셀 처리
      const cell = worksheet.getCell(rowIndex + 1, colIndex);
      const value = data[col.key];

      if (col.image && value) {
        await insertImage(workbook, worksheet, value, colIndex, rowIndex);
      } else {
        setDataCellValue(cell, col, value);
      }

      applyCellStyle(cell, STYLES.data);
    }
  }

  const NameCardHeight = config.length;
  return startRow + NameCardHeight * 2;
}

async function renderLandscapeNameCard(
  workbook: Workbook,
  worksheet: Worksheet,
  startRow: number,
  config: Column[][],
  data: Record<string, any>
): Promise<number> {
  const startRowIndex = startRow;

  for (let rowIdx = 0; rowIdx < config.length; rowIdx++) {
    const row = config[rowIdx];
    const rowIndex = startRowIndex + rowIdx;

    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      const col = row[colIdx];
      const colIndex = colIdx * 2 + 1;

      const headerCell = worksheet.getCell(rowIndex, colIndex);
      headerCell.value = col.header;
      applyCellStyle(headerCell, STYLES.header);

      worksheet.getColumn(colIndex).width = col.width ?? DEFAULT_COLUMN_WIDTH;

      const cell = worksheet.getCell(rowIndex, colIndex + 1);
      const value = data[col.key];

      if (col.image && value) {
        await insertImage(workbook, worksheet, value, colIndex, rowIndex);
      } else {
        setDataCellValue(cell, col, value);
      }

      applyCellStyle(cell, STYLES.data);
    }
  }

  const NameCardHeight = config.length;
  return startRow + NameCardHeight;
}

export {
  renderPortraitTable,
  renderLandscapeTable,
  renderPortraitNameCard,
  renderLandscapeNameCard,
};
