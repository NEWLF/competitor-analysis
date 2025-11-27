import React from "react";
import { SelectList } from "./SelectList";
import type { LFBrandOption } from "../../../hooks/useLFBrands";

interface Props {
    items: LFBrandOption[];         // ← 반드시 배열
    value?: string[] | "ALL";
    onChange: (value: string[] | "ALL") => void;
}

export const LFBrandPicker: React.FC<Props> = ({
   items,
   value,
   onChange,
}) => {
    const safeItems = Array.isArray(items) ? items : [];

    return (
        <SelectList
            items={safeItems}
            radio
            center={false}
            value={value}
            onChange={onChange}
        />
    );
};
