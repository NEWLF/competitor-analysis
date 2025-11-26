// src/containers/home/components/filter/competitorBrand/CompetitorBrandPicker.tsx

import React from "react";
import { SelectList } from "./SelectList";
import type { CompetitorBrandOption } from "../../../hooks/useCompetitorBrands";

interface Props {
    items: CompetitorBrandOption[];         // ← 반드시 배열
    value?: string[] | "ALL";
    onChange: (value: string[] | "ALL") => void;
}

export const CompetitorBrandPicker: React.FC<Props> = ({
   items,
   value,
   onChange,
}) => {
    const safeItems = Array.isArray(items) ? items : [];

    return (
        <SelectList
            items={safeItems}
            checkbox
            center={false}
            value={value}
            onChange={onChange}
        />
    );
};
