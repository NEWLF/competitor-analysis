import React from "react";
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

import {
    extractCompetitorList,
    groupCompetitorProducts,
    mapGroupToProductCardProps,
} from "./hooks/useCompetitorProductMapper";

import {
    Container,
    StatusText,
    GridWrapper,
    MoreButtonWrapper,
    MoreButton,
} from "./style";

const PAGE_SIZE = 20;

function HomePage() {
    const { data, isLoading, error } = useCompetitorProductList();
    const openChromeModal = useChromeNoticeModal();

    React.useEffect(() => {
        const cookieDate = localStorage.getItem("modalClosedDate2");
        const today = new Date().toLocaleDateString();
        if (cookieDate === today) return;
        openChromeModal();
    }, [openChromeModal]);

    React.useEffect(() => {
        log({
            reportId: "912",
            reportName: "경쟁사 상품 구성 현황 대시보드(26SS~)",
            hostAddress: window.location.host,
            deptNo: sessionStorage.getItem("userId"),
        });
    }, []);

    const products: ProductCardProps[] = React.useMemo(() => {
        const list = extractCompetitorList(data);
        if (!list.length) return [];

        const groups = groupCompetitorProducts(list);
        return groups.map(mapGroupToProductCardProps);
    }, [data]);

    const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);

    const visibleProducts = React.useMemo(
        () => products.slice(0, visibleCount),
        [products, visibleCount]
    );

    React.useEffect(() => {
        // 데이터가 바뀔 때마다 페이지 초기화
        setVisibleCount(PAGE_SIZE);
    }, [products]);

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, products.length));
    };

    return (
        <div>
            <Header
                steps={[
                    "9.1 경쟁사 상품분석",
                    "경쟁사 상품 구성 현황 대시보드(26SS~)",
                ]}
            />
            <SearchBar />
            <SearchResultHeader />
            <Container>
                <Divider height={1} width="100%" color={"rgb(204, 204, 204)"} />

                {isLoading && <StatusText>로딩 중...</StatusText>}
                {error && (<StatusText>데이터 조회 중 오류가 발생했습니다.</StatusText>)}
                {!isLoading && !error && (
                    <>
                        <GridWrapper>
                            {visibleProducts.map((product) => (
                                <ProductCard key={product.name}{...product}/>
                            ))}
                        </GridWrapper>

                        {visibleCount < products.length && (
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
        </div>
    );
}

export default withAuth(HomePage);
