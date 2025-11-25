const filterConfig = [
  [
    { header: "From", key: "from", dateFormat: "yyyy.mm" },
    { header: "To", key: "to", dateFormat: "yyyy.mm" },
    { header: "브랜드", key: "brand" },
    { header: "경쟁사", key: "compeBrand" },
  ],
  [
    { header: "카테고리", key: "category" },
    { header: "소재", key: "material" },
    { header: "상품명", key: "productName" },
  ],
];

const productTableConfig = [
  { header: "이미지", key: "COLOR_IMG_URL", image: true },
  { header: "경쟁사", key: "COMPE_BRAND_NAME", width: 12 },
  { header: "카테고리", key: "COMPE_ST_CODE", width: 12 }, // 카테고리
  { header: "상품명", key: "PROD_ST_NAME", width: 50 },
  { header: "정상가", key: "ORIGINAL_PRICE", numFmt: "#,###", width: 10 },
  { header: "할인가", key: "DISCOUNT_PRICE", numFmt: "#,###", width: 10 },
  { header: "아더컬러 수", key: "OUTER_IMG_CNT", width: 12 },
  { header: "소재", key: "MATERIAL_INFO", width: 30 },
  { header: "혼용율", key: "MIX_RATIO_INFO", width: 30 },
  { header: "사이즈", key: "SIZE_OPTIONS", width: 40 }, // 사이즈
  { header: "사이즈 정보", key: "SIZE_OPTIONS", width: 40 },
  { header: "상품코드", key: "COMPE_ST_CODE", width: 18 },
  {
    header: "최초수집일",
    key: "MIN_CALDAY",
    dateFormat: "yyyy.mm.dd",
    width: 15,
  },
  {
    header: "아더컬러 정보",
    key: "COLOR_IMG_URL",
    width: 30,
  },
  { header: "상세 이미지1", key: "COLOR_IMG_URL", image: true },
  { header: "상세 이미지2", key: "COLOR_IMG_URL", image: true },
  { header: "상세 이미지3", key: "COLOR_IMG_URL", image: true },
];

export { filterConfig, productTableConfig };
