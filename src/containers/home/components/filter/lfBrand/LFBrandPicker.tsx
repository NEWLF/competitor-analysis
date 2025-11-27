import React from "react";
import { SingleSelectList } from "./SelectList";
import type { LFBrandOption } from "../../../hooks/useLFBrands";

interface Props {
    items: LFBrandOption[];
    value?: string;
    onChange: (value: string) => void;
}

export const LFBrandPicker: React.FC<Props> = ({ items, value, onChange }) => {
    const safeItems = Array.isArray(items) ? items : [];

    return (
        <SingleSelectList
            items={safeItems}
            value={value}
            onChange={onChange}
        />
    );
};
