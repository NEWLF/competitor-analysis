// mockProducts.ts

// 상품 코드 추출기
const getProductCodeFromImage = (imagePath: string) => {
    if (!imagePath) return "";
    const fileName = imagePath.split("/").pop(); // "379399-01.jpg"
    if (!fileName) return "";
    return fileName.split("-")[0]; // "379399"
};

// 상세 페이지 URL 생성기
const buildDetailUrl = (code: string) => {
    if (!code) return "";
    return `/detail/${code}`;
};

// detailUrl + productCode 처리 유틸
const buildProduct = (item: any) => {
    const code =
        item.productCode ||
        getProductCodeFromImage(item.image) ||
        "";

    return {
        ...item,
        productCode: code,
        detailUrl: buildDetailUrl(code),
    };
};

export const mockProducts = [
    // 1. Beanpole 목업
    buildProduct({
        name: "Beanpole Premium Essential Stretch Classic Long Sleeve Shirt Limited Edition",
        image: "/images/product_demo/mock-max.jpg",
        images: ["/images/product_demo/mock-max.jpg"],
        colors: [
            {
                src: "/images/product_demo/mock-max.jpg",
                label: "프리미엄 화이트",
            },
        ],
        brand: "Beanpole",
        fit: "TommyHilfigerFitInformationSampleText123",
        origin: "MadeInRepublicOfKoreaXYZ",
        normalPrice: "1234567",
        salePrice: "654321",
        sizes:
            "XS,S,M,L,XL,XXL,90,95,100,105,110,115,44,55,66,77,85,90,95,100,Free,OneSize,RegularFit,LooseFit,WideFit,RelaxedFit,Short,Long,ExtraLong",
        material:
            "Cotton100%PolyesterBlendMaterialHighQualityFabricEnhancedDurabilitySoftTouchComfortWearabilityPremiumMadeEnvironmentalFriendlyManufacturingCertifiedGlobalStandardingPassedHighResilienceElasticityMoistureAbsorptionLevelHighLongLastingColorRetentionAntiPillingStructureAdvancedWeavingTechnologyThermalControlLayerAirFlowOptimizedSurfaceProtectionCoatingAppliedInnerLiningEnhancedTextureDoubleStitchPrecisionThreadQualityGuaranteedSmoothSurfaceFinishingPremiumTouchAdvancedProcessing",
        mixRate:
            "Cotton100%PolyesterBlendMaterialHighQualityFabricEnhancedDurabilitySoftTouchComfortWearabilityPremiumMadeEnvironmentalFriendlyManufacturingCertifiedGlobalStandardingPassedHighResilienceElasticityMoistureAbsorptionLevelHighLongLastingColorRetentionAntiPillingStructureAdvancedWeavingTechnologyThermalControlLayerAirFlowOptimizedSurfaceProtectionCoatingAppliedInnerLiningEnhancedTextureDoubleStitchPrecisionThreadQualityGuaranteedSmoothSurfaceFinishingPremiumTouchAdvancedProcessing",
        createdAt: "2025-11-18",
    }),

    // 2. 379399
    buildProduct({
        name: "커스텀핏 옥스포드 셔츠 ",
        image: "/images/product_demo/379399-01.jpg",
        productCode: "379399",
        images: [
            "/images/product_demo/379399-01.jpg",
            "/images/product_demo/379399-02.jpg",
            "/images/product_demo/379399-03.jpg",
            "/images/product_demo/379399-04.jpg",
            "/images/product_demo/379399-04.jpg",
            "/images/product_demo/379399-04.jpg",
            "/images/product_demo/379399-04.jpg",
            "/images/product_demo/379399-04.jpg",
            "/images/product_demo/379399-04.jpg",
            "/images/product_demo/379399-04.jpg",
            "/images/product_demo/379399-04.jpg",
            "/images/product_demo/379399-04.jpg",
            "/images/product_demo/379399-04.jpg",
            "/images/product_demo/379399-04.jpg",
            "/images/product_demo/379399-05.jpg",
        ],
        colors: [
            { src: "/images/product_demo/379399-01.jpg", label: "아이보리" },
            { src: "/images/product_demo/379399-02.jpg", label: "화이트" },
            { src: "/images/product_demo/379399-03.jpg", label: "네이비" },
            { src: "/images/product_demo/379399-04.jpg", label: "블랙" },
            { src: "/images/product_demo/379399-04.jpg", label: "블랙" },
            { src: "/images/product_demo/379399-04.jpg", label: "블랙" },
            { src: "/images/product_demo/379399-04.jpg", label: "블랙" },
            { src: "/images/product_demo/379399-04.jpg", label: "블랙" },
            { src: "/images/product_demo/379399-04.jpg", label: "블랙" },
            { src: "/images/product_demo/379399-04.jpg", label: "블랙" },
            { src: "/images/product_demo/379399-04.jpg", label: "블랙" },
            { src: "/images/product_demo/379399-04.jpg", label: "블랙" },
            { src: "/images/product_demo/379399-04.jpg", label: "블랙" },
            { src: "/images/product_demo/379399-04.jpg", label: "블랙" },
            { src: "/images/product_demo/379399-05.jpg", label: "라이트 그레이" },
        ],
        brand: "Polo",
        fit: "레귤러 핏 레귤러 핏 레귤러 핏 레귤러 핏 레귤러 핏 ",
        origin: "인도네시아",
        normalPrice: "209,000",
        salePrice: "",
        sizes: "XS/KR 90 / S/KR 95 / M/KR 100 / L/KR 105 / XL/KR 110XS/KR 90 / S/KR 95 / M/KR 100 / L/KR 105 / XL/KR 110XS/KR 90 / S/KR 95 / M/KR 100 / L/KR 105 / XL/KR 110",
        material: "면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%면 100%",
        mixRate: "100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100% 100%",
        createdAt: "2025-11-18",
    }),

    // 3. 397955
    buildProduct({
        name: "클래식핏 코튼 셔츠",
        image: "/images/product_demo/397955-01.jpg",
        productCode: "397955",
        images: [
            "/images/product_demo/397955-01.jpg",
            "/images/product_demo/397955-02.jpg",
            "/images/product_demo/397955-03.jpg",
            "/images/product_demo/397955-04.jpg",
            "/images/product_demo/397955-05.jpg",
        ],
        colors: [
            { src: "/images/product_demo/397955-01.jpg", label: "화이트" },
            { src: "/images/product_demo/397955-02.jpg", label: "블루" },
            { src: "/images/product_demo/397955-03.jpg", label: "라이트 블루" },
            { src: "/images/product_demo/397955-04.jpg", label: "네이비" },
            { src: "/images/product_demo/397955-05.jpg", label: "핑크" },
        ],
        brand: "Polo",
        fit: "아시안 레귤러 핏",
        origin: "중국",
        normalPrice: "209,000",
        salePrice: "—",
        sizes: "S/KR 95 / M/KR 100 / L/KR 105 / XL/KR 110 / XXL/KR 115",
        material: "면 100%",
        mixRate: "100%",
        createdAt: "2025-11-18",
    }),

    // 4. 412063
    buildProduct({
        name: "커스텀핏 스트라이프 셔츠",
        image: "/images/product_demo/412063-01.jpg",
        productCode: "412063",
        images: [
            "/images/product_demo/412063-01.jpg",
            "/images/product_demo/412063-02.jpg",
        ],
        colors: [
            { src: "/images/product_demo/412063-01.jpg", label: "블루 스트라이프" },
            { src: "/images/product_demo/412063-02.jpg", label: "네이비 스트라이프" },
        ],
        brand: "Polo",
        fit: "슬림 스트레이트 핏",
        origin: "베트남",
        normalPrice: "209,000",
        salePrice: "—",
        sizes: "XS/KR 90 / S/KR 95 / M/KR 100 / L/KR 105 / XL/KR 110",
        material: "면 100%",
        mixRate: "100%",
        createdAt: "2025-11-18",
    }),

    // 5. 515061
    buildProduct({
        name: "스트레치 클래식핏 셔츠",
        image: "/images/product_demo/515061-01.jpg",
        productCode: "515061",
        images: [
            "/images/product_demo/515061-01.jpg",
            "/images/product_demo/515061-02.jpg",
            "/images/product_demo/515061-03.jpg",
            "/images/product_demo/515061-04.jpg",
            "/images/product_demo/515061-05.jpg",
            "/images/product_demo/515061-06.jpg",
        ],
        colors: [
            { src: "/images/product_demo/515061-01.jpg", label: "화이트" },
            { src: "/images/product_demo/515061-02.jpg", label: "라이트 블루" },
            { src: "/images/product_demo/515061-03.jpg", label: "네이비" },
            { src: "/images/product_demo/515061-04.jpg", label: "블랙" },
            { src: "/images/product_demo/515061-05.jpg", label: "베이지" },
            { src: "/images/product_demo/515061-06.jpg", label: "핑크" },
        ],
        brand: "Polo",
        fit: "릴랙스 핏",
        origin: "수입 제품 (라벨 참고)",
        normalPrice: "219,000",
        salePrice: "—",
        sizes:
            "XS/KR 90 / S/KR 95 / M/KR 100 / L/KR 105 / XL/KR 110 / XXL/KR 115",
        material: "면 91%, 엘라스테인 9%",
        mixRate: "91 / 9",
        createdAt: "2025-11-18",
    }),

    // 6. 565898
    buildProduct({
        name: "클래식핏 리넨 셔츠",
        image: "/images/product_demo/565898-01.jpg",
        productCode: "565898",
        images: [
            "/images/product_demo/565898-01.jpg",
            "/images/product_demo/565898-02.jpg",
            "/images/product_demo/565898-03.jpg",
        ],
        colors: [
            { src: "/images/product_demo/565898-01.jpg", label: "화이트" },
            { src: "/images/product_demo/565898-02.jpg", label: "라이트 블루" },
            { src: "/images/product_demo/565898-03.jpg", label: "베이지" },
        ],
        brand: "tommyHilfiger",
        fit: "릴랙스 스트레이트 핏 릴랙스 스트레이트 핏 릴랙스 스트레이트 핏 릴랙스 스트레이트 핏 릴랙스 스트레이트 핏 ",
        origin: "수입 제품 (라벨 참고)",
        normalPrice: "259,000",
        salePrice: "—",
        sizes:
            "XS/KR 90 / S/KR 95 / M/KR 100 / L/KR 105 / XL/KR 110 / XXL/KR 115",
        material: "리넨 100%",
        mixRate: "100%",
        createdAt: "2025-11-18",
    }),

    // 7. 517838
    buildProduct({
        name: "클래식핏 옥스포드 셔츠",
        image: "/images/product_demo/517838-01.jpg",
        productCode: "517838",
        images: [
            "/images/product_demo/517838-01.jpg",
            "/images/product_demo/517838-02.jpg",
            "/images/product_demo/517838-03.jpg",
        ],
        colors: [
            { src: "/images/product_demo/517838-01.jpg", label: "화이트" },
            { src: "/images/product_demo/517838-02.jpg", label: "라이트 블루" },
            { src: "/images/product_demo/517838-03.jpg", label: "네이비" },
        ],
        brand: "ralphlauren",
        fit: "—",
        origin: "수입 제품 (라벨 참고)",
        normalPrice: "209,000",
        salePrice: "—",
        sizes: "S/KR 95 / M/KR 100 / L/KR 105 / XL/KR 110 / XXL/KR 115",
        material: "면 100%",
        mixRate: "100%",
        createdAt: "2025-11-18",
    }),
];
