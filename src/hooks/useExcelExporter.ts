// useExcelExporter.ts
import { useCallback, useState } from "react";
import {
  createExcelBuffer,
  downloadExcelFile,
  ExcelConfig,
} from "utils/exceljs";

function makeExcelFileName(baseName: string, date = new Date()): string {
  const iso = date.toISOString().split("T")[0];
  return `${baseName}_${iso}.xlsx`;
}

export const useExcelExporter = () => {
  const [isLoading, setIsLoading] = useState(false);

  const download = useCallback(async (config: ExcelConfig) => {
    setIsLoading(true);

    try {
      const excelBuffer = await createExcelBuffer(config.sheetConfig);
      await downloadExcelFile(
        excelBuffer,
        makeExcelFileName(config.pageConfig.fileName)
      );
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류";
      throw new Error(`엑셀 파일 생성에 실패했습니다: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    download,
  };
};
