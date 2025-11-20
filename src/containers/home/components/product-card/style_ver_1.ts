import styled from "@emotion/styled";

export const CardWrapper = styled.div`
    max-width: 420px;
    min-height: 100%;
    border: 1px solid #ddd;
    border-radius: 16px;
    background: #fff;
    padding: 15px;
    box-shadow: 0 4px 18px rgba(0,0,0,0.08);
    overflow: visible;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
`;

export const HeaderText = styled.div`
    height: 35px;
    font-size: 14px;
    font-weight: bold;
`;


export const ImgBox = styled.div`
    width: 200px;
    height: 160px;
    margin: 10px auto;
    img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
    }
`;

export const ColorImg = styled.img`
    width: 23px;
    height: 23px;
    border-radius: 4px;
    object-fit: cover;
    border: 1px solid #eee;
    transition: box-shadow 0.15s ease, border-color 0.15s ease;

    &:hover {
        border: 1px solid #bbb;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    }
`;

export const ProductTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    margin-top: 10px;
`;

export const TH = styled.th`
    padding: 6px;
    text-align: center;
    white-space: normal;
    background: #f5f7fa;
    border-bottom: 1px solid #e5e7eb;
    font-weight: 600;
    color: #333;
    font-size: 11px;
    word-break: break-all;
`;

export const TD = styled.td`
    padding: 6px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 11px;
    color: #444;
    word-break: break-all;
    white-space: normal;
`;

export const ScrollBox = styled.div`
  width: 100%;
  overflow-x: auto;       /* 가로 스크롤 */
  overflow-y: hidden;
  white-space: nowrap;    /* 줄바꿈 금지 → 한 줄로 쭉 나감 */
  display: block;

  /* 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: #b5b5b5 transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #b5b5b5;
    border-radius: 4px;
  }
`;

export const ColorScrollRow = styled.div`
    display: flex;
    gap: 4px;
    overflow-x: auto;
    padding: 2px;

    scrollbar-width: thin;
    scrollbar-color: #a9a9a9 transparent;

    &::-webkit-scrollbar {
        height: 1px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: #b5b5b5;
        border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #8f8f8f;
    }
`;
