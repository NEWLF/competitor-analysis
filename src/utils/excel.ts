import * as ExcelJS from "exceljs";

export function exportGridData(fileName, gridApi, epxortOptions) {
  console.log("exportGridData", fileName, gridApi);
  let params = {
    fileName: fileName,
    // fileName: '시즌별 입/판/재',
    columnGrups: true,
    skipGrups: false,
    sheetName: "Sheet",
    exportMode: "xlsx",
    processCellCallback: (p) => {
      console.log("=== exportGridData", p.value);
      console.log("=== exportGridData", typeof p.value === "string");
      if (p.value && typeof p.value === "string") {
        return p.value.replace(/(<([^>]+)>)/gi, "").replace(/▲/gi, "-");
      } else {
        return p.value;
      }
    },
    porcessHeaderCallback: (p) => {
      if (
        p.column.colDef.headerName &&
        p.column.colDef.headerName === "string"
      ) {
        return p.column.colDef.headerName.replace(/(<([^>]+)>)/gi, "");
      } else {
        return p.column.colDef.headerName;
      }
    },
  };
  if (!!epxortOptions) {
    params = { ...params, ...epxortOptions };
  }
  gridApi.exportDataAsExcel(params);
  // gridRef.current.api.exportDataAsExcel(params);
}

export function getCommonExcelStyles() {
  return [
    {
      id: "header",
      interior: {
        color: "#203c4a",
        pattern: "Solid",
      },
      font: {
        color: "#ffffff",
        size: 12,
        fontName: "Malgun Gothic",
      },
      alignment: {
        horizontal: "Center",
      },
      borders: {
        borderBottom: {
          color: "#365463",
          lineStyle: "Continuous",
          weight: 1,
        },
        borderLeft: {
          color: "#365463",
          lineStyle: "Continuous",
          weight: 1,
        },
        borderRight: {
          color: "#365463",
          lineStyle: "Continuous",
          weight: 1,
        },
        borderTop: {
          color: "#365463",
          lineStyle: "Continuous",
          weight: 1,
        },
      },
    },
    {
      id: "greenBackground",
      interior: {
        color: "#b5e6b5",
        pattern: "Solid",
      },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "excelRedFont",
      font: {
        color: "#ff0000",
        fontName: "Malgun Gothic",
        size: 12,
      },
    },
    {
      id: "excelBorderRight",
      borders: {
        borderRight: {
          color: "#000000",
          lineStyle: "Continuous",
          weight: 1,
        },
      },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "border-right-black",
      borders: {
        borderRight: {
          color: "#000000",
          lineStyle: "Continuous",
          weight: 1,
        },
      },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "border-bottom-black",
      borders: {
        borderBottom: {
          color: "#000000",
          lineStyle: "Continuous",
          weight: 1,
        },
      },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "border-left-black",
      borders: {
        borderLeft: {
          color: "#000000",
          lineStyle: "Continuous",
          weight: 1,
        },
      },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "cell-bg-lightpink-noborder",
      interior: {
        color: "#fff0ef",
        pattern: "Solid",
      },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "cell-bg-lightpink",
      interior: {
        color: "#fff0ef",
        pattern: "Solid",
      },
      borders: {
        borderBottom: {
          color: "#D4D4D4",
          lineStyle: "Continuous",
          weight: 1,
        },
        // borderLeft: {
        //   color: '#D4D4D4',
        //   lineStyle: 'Continuous',
        //   weight: 1
        // },
        borderRight: {
          color: "#D4D4D4",
          lineStyle: "Continuous",
          weight: 1,
        },
        borderTop: {
          color: "#D4D4D4",
          lineStyle: "Continuous",
          weight: 1,
        },
      },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "cell-bg-lightpink2",
      interior: {
        color: "#fff0ef",
        pattern: "Solid",
      },
      borders: {
        borderBottom: {
          color: "#D4D4D4",
          lineStyle: "Continuous",
          weight: 1,
        },
        borderLeft: {
          color: "#D4D4D4",
          lineStyle: "Continuous",
          weight: 1,
        },
        borderRight: {
          color: "#D4D4D4",
          lineStyle: "Continuous",
          weight: 1,
        },
        borderTop: {
          color: "#D4D4D4",
          lineStyle: "Continuous",
          weight: 1,
        },
      },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "cell-bg-yellow",
      interior: {
        color: "#ffffd3",
        pattern: "Solid",
      },
      borders: {
        borderBottom: {
          color: "#D4D4D4",
          lineStyle: "Continuous",
          weight: 1,
        },
        borderLeft: {
          color: "#D4D4D4",
          lineStyle: "Continuous",
          weight: 1,
        },
        borderRight: {
          color: "#D4D4D4",
          lineStyle: "Continuous",
          weight: 1,
        },
        borderTop: {
          color: "#D4D4D4",
          lineStyle: "Continuous",
          weight: 1,
        },
      },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "excelBasic",
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "bold",
      font: {
        bold: true,
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "dateFormat",
      // dataType: 'dateTime', 엑셀 내보내기시 파일 오류경고창이 나타남
      numberFormat: { format: "####-##-##;" }, // yy/mm/dd ( '.' , '/' 구분자)형식지정안됨. 앞4자리로 구분만 됨
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "twoDecimal",
      numberFormat: { format: "#,##0.00" },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "oneDecimal",
      numberFormat: { format: "#,##0.0" },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "oneDecimalP",
      numberFormat: { format: "#,##0.0%" },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "integer",
      numberFormat: { format: "#,###" },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "string",
      dataType: "string",
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
    {
      id: "cell-align-center",
      alignment: {
        horizontal: "Center",
      },
    },
    {
      id: "cell-align-right",
      alignment: {
        horizontal: "Right",
      },
    },
    {
      id: "excelIndent1",
      alignment: { indent: 0 },
    },
    {
      id: "excelIndent2",
      alignment: { indent: 1 },
    },
    {
      id: "excelIndent3",
      alignment: { indent: 2 },
    },
    {
      id: "excelIndent4",
      alignment: { indent: 3 },
    },
    {
      id: "excelIndent5",
      alignment: { indent: 4 },
    },
    {
      id: "excelIndent6",
      alignment: { indent: 5 },
    },
    {
      id: "excelIndent7",
      alignment: { indent: 6 },
    },
    {
      id: "excelIndent8",
      alignment: { indent: 7 },
    },
    {
      id: "excelIndent9",
      alignment: { indent: 8 },
    },
    {
      id: "excelIndent10",
      alignment: { indent: 9 },
    },
    {
      id: "excelIndent11",
      alignment: { indent: 10 },
    },

    {
      id: "excel-border-bottom-black",
      borders: {
        borderBottom: {
          color: "#000000",
          lineStyle: "Continuous",
          weight: 1,
        },
      },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },

    {
      id: "excel-border-left-black",
      borders: {
        borderLeft: {
          color: "#000000",
          lineStyle: "Continuous",
          weight: 1,
        },
      },
      font: {
        size: 12,
        fontName: "Malgun Gothic",
      },
    },
  ];
}

export const downloadExcel = async (title, header, data) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(title);
  const headerRow = sheet.getRow(1);
  headerRow.values = header;
  setColumnWidthContentFit(sheet, [header, ...data]);
  setHeaderRowStyle(headerRow);
  setAllBorder(sheet);
  data.forEach((f, i) => {
    sheet.getRow(i + 2).values = f;
  });
  makeExcelFile(workbook, title);
};

const makeExcelFile = (workbook, fileName) => {
  workbook.xlsx.writeBuffer().then((blob) => {
    const obj = new Blob([blob]);
    const url = window.URL.createObjectURL(obj);
    const elem = document.createElement("a");
    elem.href = url;
    elem.download = `${fileName}.xlsx`;
    document.body.appendChild(elem);
    elem.click();
    elem.remove();
  });
  return workbook;
};

const setColumnWidthContentFit = (sheet, data) => {
  let maxColWidths = [];
  data.forEach((row) => {
    Object.keys(row).forEach((key, index) => {
      const cellLength = row[key]?.toString().length || 0;
      maxColWidths[index] = Math.max(maxColWidths[index] || 0, cellLength);
    });
  });
  sheet.columns = maxColWidths.map((width) => ({
    width: (width > 100 ? 100 : width) + 5,
  }));
};

const setAllBorder = (sheet) => {
  sheet.columns.forEach((column, i) => {
    column.border = {
      top: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
  });
};

const setHeaderRowStyle = (headerRow) => {
  headerRow.eachCell((cell) => {
    cell.font = {
      bold: true,
    };
    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "C0C0C0" },
    };
  });
};
