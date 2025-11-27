import styled from "@emotion/styled";

// 카드 전체 컨테이너
export const CardWrapper = styled.div`
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`;

// 카드 상단 상품명 영역
export const HeaderText = styled.div`
    padding: 15px;
    font-size: 15px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.88);
    word-break: break-all;
`;

// 카드 본문 감싸는 마스크(하단 라운딩)
export const ContentMask = styled.div`
    width: 100%;
    overflow: hidden;
    border-radius: 0 0 6px 6px;
    position: relative;
`;

// 상세 정보 테이블 레이아웃
export const ProductTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    font-size: 14px;
    border-top: 1px solid #ccc;

    tbody tr > *:last-child {
        border-right: none;
    }

    tbody tr:last-child > * {
        border-bottom: none;
    }
`;

// 일반 정보 행
export const InfoRow = styled.tr`
  height: 40px;
`;

// 아더컬러 행
export const ColorRow = styled.tr`
    height: 60px;
`;

// 사이즈/소재/혼용률 행
export const ScrollRow = styled.tr`
    height: 60px;
`;

// 테이블 헤더 셀
export const TH = styled.th`
    width: 20%;
    padding: 6px 10px;
    text-align: center;
    color: rgba(0,0,0,0.88);
    background-color: #f3f4f6;
    border-bottom: 1px solid #ccc;
    vertical-align: middle;
    white-space: nowrap;
`;

// 테이블 데이터 셀
export const TD = styled.td`
    padding: 6px 10px;
    color: #111827;
    vertical-align: middle;
    border-bottom: 1px solid #ccc;
    word-break: break-all;
`;

// 우측 이미지 영역 셀
export const TdBox = styled.td`
    width: 40%;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
`;

// 수집일 텍스트 영역
export const CreateDateBox = styled.div`
    width: 100%;
    font-size: 11px;
    text-align: right;
    padding-right: 2px;
`;

// 메인 이미지 박스(비율 고정)
export const ImgBox = styled.div`
    width: 100%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    cursor: pointer;
    background: url("/images/noimg.svg") center/40% no-repeat;
`;

// 메인 상품 이미지
export const MainImage = styled.img`
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
`;

// 아더컬러 툴팁/썸네일 래퍼
export const ColorRowCell = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

// 아더컬러 썸네일 가로 스크롤 영역
export const ColorScrollRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 999px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

// 아더컬러 썸네일 이미지
export const ColorImg = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 4px;
    object-fit: cover;
    background: url("/images/noimg.svg") center/100% no-repeat;
    transition: box-shadow 0.15s ease, border-color 0.15s ease;
    border: 1px solid #ccc;
    cursor: pointer;

    &:hover {
        border: 1px solid #aaa;
        box-shadow: 0 0px 5px #aaa;
    }
`;

// 아더컬러 이름 툴팁 컨테이너
export const ColorTooltip = styled.div`
  position: absolute;
  left: 77%;
  bottom: calc(100% + 20px);
  transform: translateX(-50%);
  z-index: 50;
  pointer-events: none;
`;

// 아더컬러 이름 툴팁 내용
export const ColorTooltipInner = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  font-size: 11px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  white-space: nowrap;
`;

// 사이즈/소재/혼용률 2줄까지만 노출
export const ScrollBoxY = styled.div`
  max-height: 2.8em;
  overflow-y: auto;
  line-height: 1.4;
  word-break: break-all;
  padding-right: 4px;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 999px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
