import styled from "@emotion/styled";

export const CardWrapper = styled.div`
    max-width: 350px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`;

export const HeaderText = styled.div`
    padding: 15px;
    font-size: 14px;
    height: 70px;
    font-weight: 600;
    color: #4b5563;
    word-break: break-all;
`;

export const CreateDateBox = styled.div`
    position: relative;
`;
export const CreateDateText = styled.div`
    font-size: 9px;
    position: absolute;
    right: 4px;
    top: 4px;
`;

export const ContentMask = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 0 0 10px 10px;
`;

export const ProductTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    font-size: 12px;
    border-top: 1px solid #e5e7eb ;

    tbody tr > *:last-child {
        border-right: none;
    }

    tbody tr:last-child > * {
        border-bottom: none;
    }
`;

export const InfoRow = styled.tr`
  height: 42px;
`;

export const ColorRow = styled.tr`
    height: 60px;
`;

export const ScrollRow = styled.tr`
    height: 60px;
`;

export const TH = styled.th`
    width: 20%;
    padding: 6px 10px;
    text-align: center;
    color: #4b5563;
    background-color: #f3f4f6;
    border-bottom: 1px solid #e5e7eb;
    vertical-align: middle;
    white-space: nowrap;
`;

export const TD = styled.td`
    padding: 6px 10px;
    color: #111827;
    vertical-align: middle;
    border-bottom: 1px solid #e5e7eb;
    word-break: break-all;
`;

export const ImgBox = styled.td`
    width: 40%;
    padding: 8px 0;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border-left: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
`;

export const MainImage = styled.img`
    max-width: 100%;
    max-height: 220px;
    object-fit: contain;
    display: block;
    margin: 0 auto;
`;

export const ColorRowCell = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const ColorScrollRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
  padding: 4px 0;
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

export const ColorImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  object-fit: cover;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
  border: 1px solid #e5e7eb;
  cursor: pointer;

  &:hover {
    border: 1px solid #bbb;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  }
`;

export const ColorTooltip = styled.div`
  position: absolute;
  left: 77%;
  bottom: calc(100% + 20px);
  transform: translateX(-50%);
  z-index: 50;
  pointer-events: none;
`;

export const ColorTooltipInner = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  font-size: 8px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  white-space: nowrap;
`;

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
