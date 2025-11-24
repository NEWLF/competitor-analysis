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
    CreateDateText,
    CreateDateBox,
} from "./style";

import EllipsisTooltip from "../tooltip/EllipsisTooltip";

export interface ColorItem {
    src: string;
    label?: string;
}

export interface ProductCardProps {
    name: string;
    image: string;
    detailUrl: string;
    colors?: (string | ColorItem)[];
    brand?: string;
    fit?: string;
    origin?: string;
    normalPrice?: string | number;
    salePrice?: string | number | null;
    createdAt?: string;
    category?: string;
    sizes?: React.ReactNode;
    material?: React.ReactNode;
    mixRate?: React.ReactNode;
}

export const ProductCard: React.FC<ProductCardProps> = ({
        name,
        image,
        detailUrl,
        colors = [],
        brand,
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
    const [hoveredColorInfo, setHoveredColorInfo] = useState<{
        label: string;
        index: number;
    } | null>(null);

    const handleOpenDetail = () => {
        if (!detailUrl) return;
        window.open(detailUrl, "_blank", "noopener,noreferrer");
    };

    const getColorSrc = (colorItem: string | ColorItem): string => {
        if (typeof colorItem === "string") return colorItem;
        return colorItem?.src || "";
    };

    const getColorLabel = (
        colorItem: string | ColorItem,
        index: number
    ): string => {
        if (typeof colorItem === "string") {
            return `컬러 ${index + 1}`;
        }

        if (colorItem?.label && colorItem.label.trim().length > 0) {
            return colorItem.label;
        }

        return `컬러 ${index + 1}`;
    };

    const handleColorEnter = (colorItem: string | ColorItem, index: number) => {
        const src = getColorSrc(colorItem);
        if (!src) return;

        setHoverColor(src);
        setHoveredColorInfo({
            label: getColorLabel(colorItem, index),
            index,
        });
    };

    const handleColorLeave = () => {
        setHoverColor(null);
        setHoveredColorInfo(null);
    };

    const renderPrice = (value?: string | number | null) => {
        if (value === null || value === undefined || value === "") {
            return "—";
        }
        return value;
    };

    return (
        <CardWrapper>
            <HeaderText title={name}>[{brand}] {name}</HeaderText>
            <CreateDateBox>
                <CreateDateText>(수집일 : {createdAt})</CreateDateText>
            </CreateDateBox>
            <ContentMask>
                <ProductTable>
                    <tbody>

                    <InfoRow>
                        <TH>카테고리</TH>
                        <TD><EllipsisTooltip value={category}/></TD>

                        {/*<ImgBox rowSpan={5} onClick={handleOpenDetail}>*/}
                        <ImgBox rowSpan={5}>
                            <MainImage
                                src={hoverColor || image}
                                alt={name}
                                loading="lazy"
                            />
                        </ImgBox>
                    </InfoRow>
                    <InfoRow>
                        <TH>정상가</TH>
                        <TD>{renderPrice(normalPrice)}</TD>
                    </InfoRow>
                    <InfoRow>
                        <TH>할인가</TH>
                        <TD>{renderPrice(salePrice)}</TD>
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
                        <TH>
                            아더컬러
                            <br />({colors.length})
                        </TH>
                        <TD colSpan={2}>
                            <ColorRowCell>
                                {hoveredColorInfo && (
                                    <ColorTooltip>
                                        <ColorTooltipInner>
                                            {hoveredColorInfo.label}
                                        </ColorTooltipInner>
                                    </ColorTooltip>
                                )}

                                <ColorScrollRow onMouseLeave={handleColorLeave}>
                                    {colors.map((colorItem, index) => {
                                        const src = getColorSrc(colorItem);
                                        if (!src) return null;

                                        const label = getColorLabel(colorItem, index);

                                        return (
                                            <ColorImg
                                                key={`${src}_${index}`}
                                                src={src}
                                                alt={label}
                                                onMouseEnter={() =>
                                                    handleColorEnter(colorItem, index)
                                                }
                                                // onClick={handleOpenDetail}
                                            />
                                        );
                                    })}
                                </ColorScrollRow>
                            </ColorRowCell>
                        </TD>
                    </ColorRow>

                    <ScrollRow>
                        <TH>사이즈</TH>
                        <TD colSpan={2}>
                            <ScrollBoxY>{sizes}</ScrollBoxY>
                        </TD>
                    </ScrollRow>

                    <ScrollRow>
                        <TH>소재</TH>
                        <TD colSpan={2}>
                            <ScrollBoxY>{material}</ScrollBoxY>
                        </TD>
                    </ScrollRow>

                    <ScrollRow>
                        <TH>혼용률</TH>
                        <TD colSpan={2}>
                            <ScrollBoxY>{mixRate}</ScrollBoxY>
                        </TD>
                    </ScrollRow>
                    </tbody>
                </ProductTable>
            </ContentMask>
        </CardWrapper>
    );
};

export default ProductCard;
