import {Divider} from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { Header } from "../../components/header";
import { SearchBar } from "./components/search-bar";
import { SearchResultHeader } from "./components/SearchResultHeader";
import React from "react";
import { log } from "../../remotes/legacy/log/log";
import { withAuth } from "@/components/hocs";
import { ScrollToTopButton } from "./components/scroll-to-top-button/ScrollToTopButton";
import { useChromeNoticeModal } from "./components/notice/ChromeModal";

import {ProductCard, ProductCardProps} from "./components/product-card/ProductCard";
import { useCompetitorProductList } from "./hooks";
import {format, parse} from "date-fns";

type CompetitorProductRaw = {
    CALMONTH: string;
    COMPE_ST_CODE: string;
    PROD_ST_NAME: string;
    COMPE_BRAND_NAME: string;
    ORIGINAL_PRICE?: number | null;
    DISCOUNT_PRICE?: number | null;
    FIT_INFO?: string | null;
    ORIGIN_INFO?: string | null;
    MIN_CALDAY?: string | null;
    SIZE_OPTIONS?: string | null;
    MATERIAL_INFO?: string | null;
    MIX_RATIO_INFO?: string | null;
    IMG_RNK?: number | null;
    COLOR_OPTIONS_URL?: string | null;
    COMPE_SITE_URL: string;
    OUTER_IMG_CNT?: number | null;
    ST_RNK?: number | null;
};

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
        if (!data) return [];

        const list: CompetitorProductRaw[] = Array.isArray(data)
            ? (data as CompetitorProductRaw[])
            : ((data as any).list ?? []);

        const groupMap = new Map<string, CompetitorProductRaw[]>();

        list.forEach((item) => {
            const key =
                item.COMPE_ST_CODE ||
                `${item.COMPE_BRAND_NAME}_${item.PROD_ST_NAME}`;
            const arr = groupMap.get(key);
            if (arr) {
                arr.push(item);
            } else {
                groupMap.set(key, [item]);
            }
        });

        const groups = Array.from(groupMap.values()).map((items) => {
            let main = items[0];
            const found = items.find((it) => it.IMG_RNK === 1);
            if (found) main = found;
            return { main, items };
        });

        groups.sort((a, b) => {
            const aRank = a.main.ST_RNK ?? 0;
            const bRank = b.main.ST_RNK ?? 0;
            return aRank - bRank;
        });

        return groups.map<ProductCardProps>((group) => {
            const main = group.main;
            const mainSrc = main.COLOR_OPTIONS_URL || "";

            const colors = group.items
                .filter(
                    (it) =>
                        it.COLOR_OPTIONS_URL &&
                        it.IMG_RNK != null &&
                        it.IMG_RNK > 1
                )
                .map((it) => ({
                    src: it.COLOR_OPTIONS_URL as string,
                    label: `컬러 ${it.IMG_RNK}`,
                }));

            const createdAt = main.MIN_CALDAY && main.MIN_CALDAY.length === 8 ? format(parse(main.MIN_CALDAY, "yyyyMMdd", new Date()), "yyyy.MM.dd") : "";

            return {
                name: main.PROD_ST_NAME,
                image: mainSrc,
                detailUrl: main.COMPE_SITE_URL,
                colors,
                brand: main.COMPE_BRAND_NAME,
                fit: main.FIT_INFO ?? undefined,
                origin: main.ORIGIN_INFO ?? undefined,
                normalPrice: main.ORIGINAL_PRICE ?? undefined,
                salePrice: main.DISCOUNT_PRICE ?? undefined,
                createdAt,
                category: undefined,
                sizes: main.SIZE_OPTIONS ?? undefined,
                material: main.MATERIAL_INFO ?? undefined,
                mixRate: main.MIX_RATIO_INFO ?? undefined,
            };
        });
    }, [data]);

    const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);

    const visibleProducts = React.useMemo(
        () => products.slice(0, visibleCount),
        [products, visibleCount]
    );

    React.useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [products]);

    const handleLoadMore = () => {
        setVisibleCount((prev) =>
            Math.min(prev + PAGE_SIZE, products.length)
        );
    };

    return (
        <div>
            <Header steps={["9.1 경쟁사 상품분석", "경쟁사 상품 구성 현황 대시보드(26SS~)"]} />
            <SearchBar />
            <SearchResultHeader />
            <Container>
                <Divider height={1} width="100%" color={"rgb(204, 204, 204)"} />

                {isLoading && <StatusText>로딩 중...</StatusText>}
                {error && <StatusText>데이터 조회 중 오류가 발생했습니다.</StatusText>}

                {!isLoading && !error && (
                    <>
                        <GridWrapper>
                            {visibleProducts.map((product) => (
                                <ProductCard
                                    key={product.brand ? `${product.brand}_${product.name}` : product.name}
                                    {...product}
                                />
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

const Container = styled.div`
    width: 100%;
    padding: 0 20px;
`;

export const GridWrapper = styled.div`
    display: grid;
    gap: 15px;
    padding: 15px 0 40px 0 ;
    grid-template-columns: repeat(7, 350px);
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    align-items: start;

    @media (max-width: calc(350px * 7 + 24px * 6)) {
        grid-template-columns: repeat(6, 350px);
    }

    @media (max-width: calc(350px * 6 + 24px * 5)) {
        grid-template-columns: repeat(5, 350px);
    }

    @media (max-width: calc(350px * 5 + 24px * 4)) {
        grid-template-columns: repeat(4, 350px);
    }

    @media (max-width: calc(350px * 4 + 24px * 3)) {
        grid-template-columns: repeat(3, 350px);
    }

    @media (max-width: calc(350px * 3 + 24px * 2)) {
        grid-template-columns: repeat(2, 350px);
    }
`;

const MoreButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 8px 0 40px;
`;

const MoreButton = styled.button`
    min-width: 160px;
    height: 40px;
    padding: 0 24px;
    border-radius: 20px;
    background: #000;
    color: #fff;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background: #7c7c7c;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.24);
    }
`;

const StatusText = styled.div`
    padding: 16px 0;
    text-align: center;
    font-size: 14px;
`;

export default withAuth(HomePage);
