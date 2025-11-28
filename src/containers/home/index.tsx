import React, { useEffect, useMemo, useState } from "react";
import { Divider } from "@boxfoxs/bds-web";
import { Header } from "../../components/header";
import { SearchBar } from "./components/search-bar";
import { SearchResultHeader } from "./components/SearchResultHeader";
import { log } from "../../remotes/legacy/log/log";
import { withAuth } from "@/components/hocs";
import { ScrollToTopButton } from "./components/scroll-to-top-button/ScrollToTopButton";
import { useChromeNoticeModal } from "./components/notice/ChromeModal";

import { ProductCard } from "./components/product-card/ProductCard";
import type { ProductCardProps } from "./components/product-card/ProductCard";

import { useCompetitorProductList } from "./hooks";
import { useExcelExporter } from "hooks/useExcelExporter";
import { filterConfig, productTableConfig } from "./constant/excel-definition";

const REPORT = {
    ID: "912",
    NAME: "경쟁사 상품 구성 현황 대시보드(26SS~)",
};

import {
  extractCompetitorList,
  groupCompetitorProducts,
  mapGroupToProductCardProps,
} from "./hooks/useCompetitorProductMapper";

import {
  Container,
  GridWrapper,
  MoreButtonWrapper,
  MoreButton,
  EmptyState,
  EmptyIcon,
  EmptyText,
  PageLoadingOverlay,
  DotTypingWrapper,
  Dot,
} from "./style";

const PAGE_SIZE = 20;

function HomePage() {
  const { data, isLoading, error } = useCompetitorProductList();
    const { isLoading: isLoadingExcel, download } = useExcelExporter();
  const openChromeModal = useChromeNoticeModal();

  // 브라우저/크롬 안내 모달
  useEffect(() => {
    const cookieDate = localStorage.getItem("modalClosedDate2");
    const today = new Date().toLocaleDateString();

    if (cookieDate === today) return;
    openChromeModal();
  }, [openChromeModal]);

  // 리포트 로그
  useEffect(() => {
    log({
      reportId: "912",
      reportName: "경쟁사 상품 구성 현황 대시보드",
      hostAddress: window.location.host,
      deptNo: sessionStorage.getItem("userId"),
    });
  }, []);
  React.useEffect(() => {
    log({
      reportId: REPORT.ID,
      reportName: REPORT.NAME,
      hostAddress: window.location.host,
      deptNo: sessionStorage.getItem("userId"),
    }).then();
  }, []);

  // 원시 데이터 → 카드용 데이터 매핑
  const products: ProductCardProps[] = useMemo(() => {
    const list = extractCompetitorList(data);
    if (!list.length) return [];

    const groups = groupCompetitorProducts(list);
    return groups.map(mapGroupToProductCardProps);
  }, [data]);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // products 변경 시 첫 페이지로 리셋
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [products.length]);

  const visibleProducts = useMemo(
      () => products.slice(0, visibleCount),
      [products, visibleCount]
  );

  const hasError = Boolean(error);
  const hasProducts = products.length > 0;

  const showEmptyState = !isLoading && (!hasProducts || hasError);
  const showProductList = !isLoading && hasProducts && !hasError;
  const canLoadMore = showProductList && visibleCount < products.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, products.length));
  };

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
        <Header steps={["9.1 경쟁사 상품분석", "경쟁사 상품 구성 현황 대시보드"]}/>
        <SearchBar />
          <SearchResultHeader
              onClickExportExcel={handleExport}
              isLoading={isLoadingExcel}
          />
        <Container>
          <Divider height={1} width="100%" color="rgb(204, 204, 204)" />

          {showEmptyState && (
              <EmptyState>
                <EmptyIcon src="/images/error.svg" />
                <EmptyText>조회된 데이터가 없습니다.</EmptyText>
              </EmptyState>
          )}

          {showProductList && (
              <>
                <GridWrapper>
                  <ProductCard
                      name="테스트 상품명 테스트 상품명 테스트 상품명상품명상품명상품명상품명상품명상품명상품명"
                      image="https://img.ssfshop.com/cmd/RB_100x13sfshop.com/goods/BPBR/25/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg"
                      detailUrl="#"
                      category="상의 > 티셔츠 > 반팔티상의 > 티셔츠 > 반팔티상의 > 티셔츠 > 반팔티상의 > 티셔츠 > 반팔티상의 > 티셔츠 > 반팔티상의 > 티셔츠 > 반팔티상의 > 티셔츠 > 반팔티상의 > 티셔츠 > 반팔티"
                      fit="오버핏 / 레귤러 믹스오버핏 / 레귤러 믹스오버핏 / 레귤러 믹스오버핏 / 레귤러 믹스오버핏 / 레귤러 믹스오버핏 / 레귤러 믹스오버핏 / 레귤러 믹스오버핏 / 레귤러 믹스"
                      origin="KOREAKOREAKOREAKOREAKOREAKOREAKOREAKOREAKOREAKOREAKOREA"
                      normalPrice={129000}
                      salePrice={89000}
                      createdAt="2025-11-27"
                      colors={[
                        { src: "https://img.ssfshop.com/cmd/RB_100x133/sps://5/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg", label: "#FF0000" },
                        { src: "https://img.ssfshop.com/cmd/RB_100x133/sps://5/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg", label: "#DC143C" },
                        { src: "https://img.ssfshop.com/cmd/RB_100x133/sps://5/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg", label: "#B22222" },
                        { src: "https://img.ssfshop.com/cmd/RB_100x133/sps://5/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg", label: "#A52A2A" },
                        { src: "https://img.ssfshop.com/cmd/RB_100x133/sps://5/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg", label: "#A0522D" },
                        { src: "https://img.ssfshop.com/cmd/RB_100x133/sps://5/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg", label: "#CD5C5C" },
                        { src: "https://img.ssfshop.com/cmd/RB_100x133/sps://5/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg", label: "#BC8F8F" },
                        { src: "https://img.ssfshop.com/cmd/RB_100x133/sps://5/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg", label: "#F08080" },
                        { src: "https://img.ssfshop.com/cmd/RB_100x133/sps://5/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg", label: "#FA8072" },
                        { src: "https://img.ssfshop.com/cmd/RB_100x133/sps://5/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg", label: "#E9967A" },
                        { src: "https://img.ssfshop.com/cmd/RB_100x133/sps://5/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg", label: "#FF7F50" },
                        { src: "https://img.ssfshop.com/cmd/RB_100x133/sps://5/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg", label: "#FF6347" },
                        { src: "https://img.ssfshop.com/cmd/RB_100x133/sps://5/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg", label: "#F4A460" },
                        { src: "https://img.ssfshop.com/cmd/RB_100x133/sps://5/10/31/GM0025103183246_0_THNAIL_ORGINL_20251105114507780.jpg", label: "#FFA07A" },
                      ]}
                      sizes="XS / S / M / L / XL / XXLXS / S / M / L / XL / XXLXS / S / M / L / XL / XXLXS / S / M / L / XL / XXLXS / S / M / L / XL / XXLXS / S / M / L / XL / XXL"
                      material="겉감: 면 100% / 배색: 폴리에스터 100%겉감: 면 100% / 배색: 폴리에스터 100%겉감: 면 100% / 배색: 폴리에스터 100%겉감: 면 100% / 배색: 폴리에스터 100%겉감: 면 100% / 배색: 폴리에스터 100%겉감: 면 100% / 배색: 폴리에스터 100%"
                      mixRate="면 80%, 폴리에스터 15%, 폴리우레탄 5%면 80%, 폴리에스터 15%, 폴리우레탄 5%면 80%, 폴리에스터 15%, 폴리우레탄 5%면 80%, 폴리에스터 15%, 폴리우레탄 5%면 80%, 폴리에스터 15%, 폴리우레탄 5%면 80%, 폴리에스터 15%, 폴리우레탄 5%면 80%, 폴리에스터 15%, 폴리우레탄 5%면 80%, 폴리에스터 15%, 폴리우레탄 5%면 80%, 폴리에스터 15%, 폴리우레탄 5%면 80%, 폴리에스터 15%, 폴리우레탄 5%면 80%, 폴리에스터 15%, 폴리우레탄 5%"
                  />
                  {visibleProducts.map((product, index) => (
                      <ProductCard key={product.name ? `${product.name}_${index}` : String(index)}
                          {...product}
                      />
                  ))}
                </GridWrapper>

                {canLoadMore && (
                    <MoreButtonWrapper>
                      <MoreButton type="button" onClick={handleLoadMore}>
                        더보기 ({visibleCount}/{products.length})
                      </MoreButton>
                    </MoreButtonWrapper>
                )}
              </>
          )}
        </Container>
        <ScrollToTopButton />

        {isLoading && (
            <PageLoadingOverlay>
              <DotTypingWrapper>
                <Dot delay={0} />
                <Dot delay={0.12} />
                <Dot delay={0.24} />
              </DotTypingWrapper>
            </PageLoadingOverlay>
        )}
      </div>
  );
}

export default withAuth(HomePage);
