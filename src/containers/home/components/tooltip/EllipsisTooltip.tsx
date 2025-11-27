// EllipsisTooltip.tsx
import React from "react";
import {
    TooltipWrapper,
    TooltipContent,
    EllipsisOneLine,
    EllipsisMultiLine,
} from "./style";
import { useEllipsisTooltip } from "../../hooks/useEllipsisTooltip";

const MIN_TOOLTIP_LENGTH = 12;
const DEFAULT_MAX_WIDTH = 200;

const shouldShowTooltip = (value?: string, isEllipsis?: boolean) => {
    if (!value) return false;
    if (isEllipsis) return true;
    return value.length >= MIN_TOOLTIP_LENGTH;
};

export interface EllipsisTooltipProps {
    value?: string;
    multiline?: boolean;
    minHeight?: number;
    maxWidth?: number;
}

const EllipsisTooltip: React.FC<EllipsisTooltipProps> = ({
        value,
        multiline = false,
        minHeight = 42,
        maxWidth,
    }) => {
    const { ref, isEllipsis } = useEllipsisTooltip(value);
    const showTooltip = shouldShowTooltip(value, isEllipsis);

    const [tooltipPos, setTooltipPos] = React.useState<{
        top: number;
        left: number;
    } | null>(null);

    const EllipsisComponent = multiline ? EllipsisMultiLine : EllipsisOneLine;

    const updatePosition = React.useCallback(() => {
        if (!showTooltip || !ref.current) {
            setTooltipPos(null);
            return;
        }

        const rect = ref.current.getBoundingClientRect();
        const top = rect.bottom - -2;
        const left = rect.left;

        setTooltipPos({ top, left });
    }, [ref, showTooltip]);

    const handleEnter = () => {
        updatePosition();
    };

    const handleLeave = () => {
        setTooltipPos(null);
    };

    const effectiveMaxWidth = maxWidth ?? DEFAULT_MAX_WIDTH;

    return (
        <TooltipWrapper
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onFocus={handleEnter}
            onBlur={handleLeave}
        >
            <EllipsisComponent ref={ref} style={multiline ? { minHeight } : undefined}>
                {value || ""}
            </EllipsisComponent>

            {showTooltip && tooltipPos && (
                <TooltipContent
                    style={{
                        position: "fixed",
                        top: tooltipPos.top,
                        left: tooltipPos.left,
                        maxWidth: `${effectiveMaxWidth}px`,
                    }}
                >
                    {value}
                </TooltipContent>
            )}
        </TooltipWrapper>
    );
};

export default EllipsisTooltip;
