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
    ScrollBox,
} from "./style_ver_1";

import EllipsisTooltip from "../tooltip/EllipsisTooltip";

export const ProductCard = ({
                                name,
                                image,
                                detailUrl,
                                colors = [],
                                brand,
                                productCode,
                                fit,
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

    const openDetail = () => {
        if (detailUrl) window.open(detailUrl, "_blank", "noopener,noreferrer");
    };

    const getColorSrc = (colorItem: any): string => {
        if (!colorItem) return "";
        if (typeof colorItem === "string") return colorItem;
        return colorItem.src || "";
    };

    const getColorLabel = (colorItem: any, index: number): string => {
        if (!colorItem) return "";
        if (typeof colorItem === "string") return `컬러 ${index + 1}`;
        return colorItem.label || `컬러 ${index + 1}`;
    };

    const handleColorEnter = (colorItem: any, index: number) => {
        const src = getColorSrc(colorItem);
        const label = getColorLabel(colorItem, index);

        if (!src) return;

        setHoverColor(src);
        setHoveredColorInfo({ label, index });
    };

    const handleColorLeave = () => {
        setHoverColor(null);
        setHoveredColorInfo(null);
    };

    return (
        <CardWrapper>
            <HeaderText>{name}</HeaderText>
            <ImgBox onClick={openDetail} style={{ cursor: "pointer" }}>
                <img src={hoverColor || image} alt={name} />
            </ImgBox>

            <ProductTable>
                <colgroup>
                    <col style={{ width: 70 }} />
                    <col />
                    <col style={{ width: 70 }} />
                    <col />
                </colgroup>

                <tbody>
                <tr  style={{ height: 46 }} >
                    <TH>아더컬러<br />({colors.length})</TH>
                    <TD colSpan={3} style={{ position: "relative"}} >
                        {hoveredColorInfo && (
                            <div
                                style={{position: "absolute", left: "35%", textAlign: "center", bottom: "calc(100% + 0px)", transform: "translateX(-50%)", padding: "4px 8px", background: "#f5f7fa", color: "rgba(0, 0, 0, 0.85)", boxShadow: "0 2px 6px rgba(0,0,0,0.25)",fontSize: 11, borderRadius: 4, whiteSpace: "nowrap", zIndex: 50,}}>
                                {hoveredColorInfo.label}
                            </div>
                        )}

                        <ColorScrollRow>
                            {colors.map((c: any, i: number) => {
                                const src = getColorSrc(c);
                                if (!src) return null;

                                return (
                                    <div
                                        key={i}
                                        style={{display: "inline-block", position: "relative", marginRight: 4}}
                                        onMouseEnter={() => handleColorEnter(c, i)}
                                        onMouseLeave={handleColorLeave}
                                        onClick={openDetail}
                                    >
                                        <ColorImg src={src} style={{ cursor: "pointer" }} />
                                    </div>
                                );
                            })}
                        </ColorScrollRow>
                    </TD>
                </tr>

                <tr>
                    <TH>상품코드</TH>
                    <TD colSpan={3}>{productCode || "—"}</TD>
                </tr>

                <tr>
                    <TH>브랜드</TH>
                    <TD>{brand}</TD>

                    <TH>핏</TH>
                    <TD><EllipsisTooltip value={fit} /></TD>
                </tr>

                <tr>
                    <TH>원산지</TH>
                    <TD><EllipsisTooltip value={origin} /></TD>

                    <TH>수집일</TH>
                    <TD>{createdAt}</TD>
                </tr>

                <tr>
                    <TH>정상가</TH>
                    <TD>{normalPrice}</TD>

                    <TH>할인가</TH>
                    <TD>{salePrice}</TD>
                </tr>

                <tr style={{ height: 35 }}>
                    <TH>사이즈</TH>
                    <TD colSpan={3}><ScrollBox>{sizes}</ScrollBox></TD>
                </tr>

                <tr style={{ height: 35 }}>
                    <TH>소재</TH>
                    <TD colSpan={3}><ScrollBox>{material}</ScrollBox></TD>
                </tr>

                <tr style={{ height: 35 }}>
                    <TH>혼용률</TH>
                    <TD colSpan={3}><ScrollBox>{mixRate}</ScrollBox></TD>
                </tr>
                </tbody>
            </ProductTable>
        </CardWrapper>
    );
};
