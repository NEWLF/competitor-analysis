// src/containers/home/components/tooltip/style.ts
import styled from "@emotion/styled";

export const TooltipWrapper = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
    vertical-align: middle;

    /* Wrapper 위에 마우스 올렸을 때 TooltipContent 보이게 */
    &:hover [data-tooltip-content="true"] {
        opacity: 1;
        pointer-events: auto;
    }
`;

export const EllipsisOneLine = styled.div`
    display: block;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: default;
`;

export const EllipsisMultiLine = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    line-height: 1.4;
    min-height: calc(1.4em * 2);
`;

export const TooltipContent = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 6px;

    padding: 8px;
    background: rgba(0, 0, 0, 0.85);
    color: white;
    border-radius: 6px;
    font-size: 13px;
    line-height: 1.4;
    z-index: 1000;

    max-width: 200px;
    width: max-content;
    white-space: normal;

    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);

    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease;
`;
