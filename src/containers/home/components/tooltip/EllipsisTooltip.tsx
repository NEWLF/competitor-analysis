// src/containers/home/components/tooltip/EllipsisTooltip.tsx
import React from "react";
import {
    TooltipWrapper,
    TooltipContent,
    EllipsisOneLine,
    EllipsisMultiLine,
} from "./style";
import { useEllipsisTooltip } from "../../hooks/useEllipsisTooltip";

const MIN_TOOLTIP_LENGTH = 12;

const shouldShowTooltip = (value?: string, isEllipsis?: boolean) => {
    if (!value) return false;
    if (isEllipsis) return true;
    return value.length >= MIN_TOOLTIP_LENGTH;
};

export interface EllipsisTooltipProps {
    value?: string;
    multiline?: boolean;
    minHeight?: number; // multiline일 때 높이
}

const EllipsisTooltip: React.FC<EllipsisTooltipProps> = ({
                                                             value,
                                                             multiline = false,
                                                             minHeight = 42,
                                                         }) => {
    const { ref, isEllipsis } = useEllipsisTooltip(value);
    const showTooltip = shouldShowTooltip(value, isEllipsis);

    const EllipsisComponent = multiline ? EllipsisMultiLine : EllipsisOneLine;

    return (
        <TooltipWrapper>
            <EllipsisComponent
                ref={ref}
                style={multiline ? { minHeight } : undefined}
            >
                {value || "—"}
            </EllipsisComponent>

            {showTooltip && (
                <TooltipContent data-tooltip-content="true">
                    {value}
                </TooltipContent>
            )}
        </TooltipWrapper>
    );
};

export default EllipsisTooltip;
