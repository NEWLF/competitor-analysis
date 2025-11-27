import React, { useState } from "react";
import {
    HeaderText,
    CardWrapper,
    ProductTable,
    TH,
    TD,
    ImgBox,
    ColorScrollRow,
    ColorImg,
    ContentMask,
    ScrollBoxY,
    ColorRow,
    ScrollRow,
    ColorRowCell,
    ColorTooltip,
    ColorTooltipInner,
    MainImage,
    InfoRow,
    CreateDateBox,
    TdBox,
} from "./style";

import EllipsisTooltip from "../tooltip/EllipsisTooltip";

export interface ColorItem {
    src: string;
    label?: string;
}

export interface ProductCardProps {
    name: string;
    image: string;
    detailUrl?: string;
    colors?: (string | ColorItem)[];
    fit?: string;
    category?: string;
    origin?: string;
    normalPrice?: string | number;
    salePrice?: string | number;
    createdAt?: string;
    sizes?: string;
    material?: string;
    mixRate?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    name,
    image,
    detailUrl,
    colors = [],
    fit,
    category,
    origin,
    normalPrice,
    salePrice,
    createdAt,
    sizes,
    material,
    mixRate,
}) => {
    const [hoverColor, setHoverColor] = useState<string | null>(null);
    const [hoveredColorLabel, setHoveredColorLabel] = useState<string | null>(null);

    const handleOpenDetail = () => {
        if (!detailUrl) return;
        window.open(detailUrl, "_blank", "noopener,noreferrer");
    };

    const getColorSrc = (colorItem: string | ColorItem): string =>
        typeof colorItem === "string" ? colorItem : colorItem?.src || "";

    const getColorLabel = (colorItem: string | ColorItem): string | undefined => {
        if (typeof colorItem !== "string") {
            const trimmed = colorItem.label?.trim();
            if (trimmed) return trimmed;
        }
        return undefined;
    };

    const handleColorEnter = (colorItem: string | ColorItem) => {
        const src = getColorSrc(colorItem);
        const label = getColorLabel(colorItem);
        console.log("color hover:", colorItem, "src:", src, "label:", label);
        if (!src) return;

        setHoverColor(src);
        setHoveredColorLabel(getColorLabel(colorItem) ?? null);
    };

    const handleColorLeave = () => {
        setHoverColor(null);
        setHoveredColorLabel(null);
    };

    return (
        <CardWrapper>
            <HeaderText><EllipsisTooltip value={name} /></HeaderText>
            <ContentMask>
                <ProductTable>
                    <tbody>
                    <InfoRow>
                        <TH>카테고리</TH>
                        <TD><EllipsisTooltip value={category} /></TD>

                        <TdBox rowSpan={5}>
                            <CreateDateBox>수집일: {createdAt}</CreateDateBox>
                            <ImgBox onClick={handleOpenDetail}>
                                <MainImage
                                    src={hoverColor || image}
                                    onError={(e) => {e.currentTarget.style.display = "none";}}
                                />
                            </ImgBox>
                        </TdBox>
                    </InfoRow>

                    <InfoRow>
                        <TH>정상가</TH>
                        <TD>{normalPrice?.toLocaleString("ko-KR")}</TD>
                    </InfoRow>

                    <InfoRow>
                        <TH>할인가</TH>
                        <TD>{salePrice?.toLocaleString("ko-KR")}</TD>
                    </InfoRow>

                    <InfoRow>
                        <TH>핏</TH>
                        <TD><EllipsisTooltip value={fit} /></TD>
                    </InfoRow>

                    <InfoRow>
                        <TH>원산지</TH>
                        <TD><EllipsisTooltip value={origin} /></TD>
                    </InfoRow>

                    <ColorRow>
                        <TH>아더컬러<br />({colors.length})</TH>
                        <TD colSpan={2}>
                            <ColorRowCell>
                                {hoveredColorLabel && (
                                    <ColorTooltip>
                                        <ColorTooltipInner>{hoveredColorLabel}</ColorTooltipInner>
                                    </ColorTooltip>
                                )}

                                <ColorScrollRow onMouseLeave={handleColorLeave}>
                                    {colors.map((colorItem, index) => {
                                        const src = getColorSrc(colorItem);
                                        const COLOR_FALLBACK = "/images/noimg.svg";
                                        if (!src) return null;

                                        return (
                                            <ColorImg
                                                key={`${src}_${index}`}
                                                src={src}
                                                onMouseEnter={() => handleColorEnter(colorItem)}
                                                onClick={handleOpenDetail}
                                                onError={(e) => {
                                                    if (!e.currentTarget.src.includes("noimg.svg")) {
                                                        e.currentTarget.src = COLOR_FALLBACK;
                                                    }
                                                }}
                                            />
                                        );
                                    })}
                                </ColorScrollRow>
                            </ColorRowCell>
                        </TD>
                    </ColorRow>

                    <ScrollRow>
                        <TH>사이즈</TH>
                        <TD colSpan={2}><ScrollBoxY>{sizes}</ScrollBoxY></TD>
                    </ScrollRow>

                    <ScrollRow>
                        <TH>소재</TH>
                        <TD colSpan={2}><ScrollBoxY>{material}</ScrollBoxY></TD>
                    </ScrollRow>

                    <ScrollRow>
                        <TH>혼용률</TH>
                        <TD colSpan={2}><ScrollBoxY>{mixRate}</ScrollBoxY></TD>
                    </ScrollRow>
                    </tbody>
                </ProductTable>
            </ContentMask>
        </CardWrapper>
    );
};

export default ProductCard;
