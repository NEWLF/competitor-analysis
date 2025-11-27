import { Divider } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { Header } from "../../components/header";
import { SearchBar } from "./components/search-bar";
import { SearchResultHeader } from "./components/SearchResultHeader";
import React from "react";
import { log } from "../../remotes/legacy/log/log";
import { withAuth } from "@/components/hocs";
import { ScrollToTopButton } from "./components/scroll-to-top-button/ScrollToTopButton";
import { useChromeNoticeModal } from "./components/notice/ChromeModal";
import { useCompetitorProductList } from "./hooks";
import { mockProducts } from "./data/mockProducts";
import ProductCard from "./components/product-card/ProductCard";
import { useExcelExporter } from "hooks/useExcelExporter";
import { filterConfig, productTableConfig } from "./constant/excel-definition";

const REPORT = {
  ID: "912",
  NAME: "경쟁사 상품 구성 현황 대시보드(26SS~)",
};

function HomePage() {
  const { data, isLoading, error } = useCompetitorProductList();
  const { isLoading: isLoadingExcel, download } = useExcelExporter();

  const openChromeModal = useChromeNoticeModal();

  React.useEffect(() => {
    const cookieDate = localStorage.getItem("modalClosedDate2");
    if (cookieDate === new Date().toLocaleDateString()) {
      return;
    } else {
      openChromeModal();
    }
  }, []);

  React.useEffect(() => {
    log({
      reportId: REPORT.ID,
      reportName: REPORT.NAME,
      hostAddress: window.location.host,
      deptNo: sessionStorage.getItem("userId"),
    }).then();
  }, []);

  const handleExport = async () => {
    await download({
      sheetConfig: [
        {
          sheetName: "경쟁사 상품",
          config: [
            {
              type: "nameCard",
              orientation: "landscape",
              config: filterConfig,
              data: {
                from: "2025.10",
                to: "202511",
                brand: "HZ",
                compeBrand: "폴로, 타미힐피거",
                category: "스웨터",
                material: "",
                productName: "니트",
              },
            },
            { type: "gap" },
            { type: "gap" },
            {
              type: "table",
              orientation: "portrait",
              config: productTableConfig,
              data: data,
            },
          ],
        },
      ],
      pageConfig: {
        fileName: `${REPORT.ID}. ${REPORT.NAME}`,
      },
    });
  };

  return (
    <div>
      <Header
        steps={["9.1 경쟁사 상품분석", "경쟁사 상품 구성 현황 대시보드(26SS~)"]}
      />
      <SearchBar />
      <SearchResultHeader
        onClickExportExcel={handleExport}
        isLoading={isLoadingExcel}
      />
      <Container>
        <Divider height={1} width="100%" color={"rgb(204, 204, 204)"} />
        <GridWrapper>
          {mockProducts.map((p, idx) => (
            <ProductCard key={idx} {...p} />
          ))}
        </GridWrapper>
      </Container>
      <ScrollToTopButton />
    </div>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
`;
export const GridWrapper = styled.div`
  display: grid;
  gap: 15px;
  padding: 15px 0 40px 0;
  grid-template-columns: repeat(7, 380px);
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  align-items: start;

  @media (max-width: calc(380px * 7 + 24px * 6)) {
    grid-template-columns: repeat(6, 380px);
  }

  @media (max-width: calc(380px * 6 + 24px * 5)) {
    grid-template-columns: repeat(5, 380px);
  }

  @media (max-width: calc(380px * 5 + 24px * 4)) {
    grid-template-columns: repeat(4, 380px);
  }

  @media (max-width: calc(380px * 4 + 24px * 3)) {
    grid-template-columns: repeat(3, 380px);
  }

  @media (max-width: calc(380px * 3 + 24px * 2)) {
    grid-template-columns: repeat(2, 380px);
  }
`;

export default withAuth(HomePage);
