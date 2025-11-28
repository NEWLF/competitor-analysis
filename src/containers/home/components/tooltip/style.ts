import styled from "@emotion/styled";

export const TooltipWrapper = styled.div`
    position: relative;
    //display: inline-block;
    max-width: 100%;
    
    &:hover [data-tooltip-content="true"] {
        opacity: 1;
        pointer-events: auto;
    }
`;

// 한 줄 말줄임용
export const EllipsisOneLine = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

// 여러 줄 말줄임이 필요하면 여기 그대로 사용
export const EllipsisMultiLine = styled.div`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    min-height: calc(1.4em * 2);
`;

// 실제 툴팁
// style.ts (툴팁 관련 부분만)
export const TooltipContent = styled.div`
    padding: 4px 8px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.9);
    color: #fff;
    font-size: 12px;
    line-height: 1.4;

    display: block;
    white-space: normal;     
    word-break: break-all;

    z-index: 9999;
    pointer-events: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
`;
