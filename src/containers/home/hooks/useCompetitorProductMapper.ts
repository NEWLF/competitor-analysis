// src/containers/home/hooks/competitorProductMapper.ts
import { format, parse } from "date-fns";
import { ProductCardProps } from "../components/product-card/ProductCard";


export type CompetitorProductRaw = {
    CALMONTH: string;
    MIN_CALDAY?: string | null;
    MALL_CODE?: string;               // 경쟁사코드
    COMPE_ST_CODE: string;            // 경쟁사 ST 코드
    PROD_ID?: string;                 // 경쟁사 제품ID
    PROD_COLOR_CODE?: string;         // 경쟁사 컬러 코드
    COMPE_SOURCE_NAME?: string | null;// 경쟁사 소스이름
    PROD_ST_NAME: string;             // 제품명
    CATEGORY?: string | null;         // 카테고리
    ORIGINAL_PRICE?: number | null;   // 정상가
    DISCOUNT_PRICE?: number | null;   // 할인가
    FIT_INFO?: string | null;         // 핏 정보
    SIZE_OPTIONS?: string | null;     // 사이즈 정보
    ORIGIN_INFO?: string | null;      // 원산지
    COMPE_BRAND_NAME: string;         // 경쟁사 브랜드명
    MATERIAL_INFO?: string | null;    // 소재
    MIX_RATIO_INFO?: string | null;   // 혼용률
    COLOR_IMG_URL?: string | null;    // 이미지 URL(누끼)
    OUTER_IMG_CNT?: number | null;    // 아더컬러 수
    PROD_RNK?: number | null;         // 경쟁자 제품 랭킹
    PROD_STCL_RNK?: number | null;    // 제품안 색상랭킹
    COMPE_SITE_URL: string;           // 메인사이트 URL
    PROD_SEASON?: string | null;      // 제품 시즌
    PROD_COLOR_NAME?: string | null;  // 제품 컬러 이름
};

export type CompetitorProductGroup = {
    main: CompetitorProductRaw;
    items: CompetitorProductRaw[];
};

// 1) API 응답 → 원본 리스트 추출
export function extractCompetitorList(data: unknown): CompetitorProductRaw[] {
    if (!data) return [];

    if (Array.isArray(data)) {
        return data as CompetitorProductRaw[];
    }

    const anyData = data as any;
    if (Array.isArray(anyData.list)) {
        return anyData.list as CompetitorProductRaw[];
    }

    return [];
}

// 2) ST 코드 기준 그룹핑
export function groupCompetitorProducts(
    list: CompetitorProductRaw[]
): CompetitorProductGroup[] {
    const groupMap = new Map<string, CompetitorProductRaw[]>();

    list.forEach((item) => {
        const key =
            item.COMPE_ST_CODE ||
            `${item.COMPE_BRAND_NAME}_${item.PROD_ST_NAME}`;
        const arr = groupMap.get(key);
        if (arr) arr.push(item);
        else groupMap.set(key, [item]);
    });

    const groups: CompetitorProductGroup[] = Array.from(groupMap.values()).map(
        (items) => ({
            main: pickMainItem(items),
            items,
        })
    );

    // 메인 랭킹 기준 정렬
    groups.sort((a, b) => {
        const aRank = a.main.PROD_RNK ?? 0;
        const bRank = b.main.PROD_RNK ?? 0;
        return aRank - bRank;
    });

    return groups;
}

// 3) 메인 아이템 선택
//    지금은 PROD_STCL_RNK === 1 기준.
//    나중에 "0번째만" 쓰기로 바꾸면 여기 조건만 === 0 으로 변경하면 됨.
export function pickMainItem(
    items: CompetitorProductRaw[]
): CompetitorProductRaw {
    const found = items.find((it) => it.PROD_STCL_RNK === 1);
    return found ?? items[0];
}

// 4) 그룹 → 화면용 ProductCardProps 매핑
//    여기에서 null/undefined → "" 로 치환해서
//    화면에서는 공백으로만 보이도록 처리.
export function mapGroupToProductCardProps(
    group: CompetitorProductGroup
): ProductCardProps {
    const main = group.main;

    const mainSrc = main.COLOR_IMG_URL || "";

    const colors =
        group.items
            .filter(
                (it) =>
                    it.COLOR_IMG_URL &&
                    it.PROD_STCL_RNK != null &&
                    it.PROD_STCL_RNK > 1         // 아더컬러
            )
            .map((it) => ({
                src: it.COLOR_IMG_URL as string,
                label:
                    (it.PROD_COLOR_NAME && it.PROD_COLOR_NAME.trim()) ||
                    `컬러 ${it.PROD_STCL_RNK}`,
            })) ?? [];

    const createdAt =
        main.MIN_CALDAY && main.MIN_CALDAY.length === 8
            ? format(
                new Date(
                    Number(main.MIN_CALDAY.slice(0, 4)),
                    Number(main.MIN_CALDAY.slice(4, 6)) - 1,
                    Number(main.MIN_CALDAY.slice(6, 8))
                ),
                "yyyy.MM.dd"
            )
            : "";

    return {
        name: main.PROD_ST_NAME ?? "",
        image: mainSrc,
        detailUrl: main.COMPE_SITE_URL ?? "",
        colors,
        brand: main.COMPE_BRAND_NAME ?? "",
        fit: main.FIT_INFO ?? "",
        origin: main.ORIGIN_INFO ?? "",
        normalPrice: main.ORIGINAL_PRICE ?? "",
        salePrice: main.DISCOUNT_PRICE ?? "",
        createdAt,
        category: main.CATEGORY ?? "",
        sizes: main.SIZE_OPTIONS ?? "",
        material: main.MATERIAL_INFO ?? "",
        mixRate: main.MIX_RATIO_INFO ?? "",
    };
}
