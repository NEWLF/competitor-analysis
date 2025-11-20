import { useCallbackRef } from "@boxfoxs/core-hooks";
import styled from "@emotion/styled";
import { Dropdown } from "@/components/layout";
import { useBooleanState } from "hooks/useBooleanState";
import { useStyleCode } from "hooks/useStyleCode";
import React, { useState } from "react";
import { SelectItem } from "../SelectItem";
import { FilterField } from "./FilterField";

export function STCLField({
  value,
  onChange,
  onEnter,
}: {
  value: string;
  onChange: (value: string) => void;
  onEnter: (value: string) => void;
}) {
  const [isFocused, foucs, blur] = useBooleanState();
  const query = useStyleCode(value);
  const [image, setImage] = useState<string>();
  const isOpen = isFocused && query.data?.length > 0;
  const handleChange = useCallbackRef((value: string) => {
    onChange(value);
    blur();
    onEnter(value);
  });

  return (
    <FilterField
      label={`STCL`}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      onFocus={foucs}
      onBlur={blur}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          onEnter(e.currentTarget.value);
        }
      }}
    >
      <Dropdown open={isOpen}>
        <STCLContainer>
          <STCLList
            data={query.data ?? []}
            onImage={setImage}
            onChange={handleChange}
          />
          {image && <STCLImage src={image} />}
        </STCLContainer>
      </Dropdown>
    </FilterField>
  );
}

const STCLContainer = styled.div`
  display: flex;
  max-height: 300px;
`;

const STCLListContainer = styled.div`
  max-height: 300px;
  overflow: auto;
`;

const STCLList = React.memo(function STCLList({
  data,
  onChange,
  onImage,
}: {
  onImage: (url: string) => void;
  onChange: (stcl: string) => void;
  data: { STCL: string; URL: string }[];
}) {
  return (
    <STCLListContainer>
      {data.map((i) => (
        <STCLItem
          key={i.STCL}
          data={i}
          onHover={() => onImage(i.URL)}
          onBlur={() => onImage(undefined)}
          onClick={() => {
            onChange(i.STCL);
            blur();
          }}
        />
      ))}
    </STCLListContainer>
  );
});

function STCLItem({
  data,
  onClick,
  onHover,
  onBlur,
}: {
  data: { STCL: string; URL: string };
  onClick: () => void;
  onHover: () => void;
  onBlur: () => void;
}) {
  return (
    <STCLItemContainer onMouseOver={onHover} onMouseLeave={onBlur}>
      <SelectItem onToggle={onClick}>{data.STCL}</SelectItem>
    </STCLItemContainer>
  );
}

const STCLItemContainer = styled.div`
  position: relative;
`;

const STCLImage = styled.img`
  object-fit: contain;
  height: 300px;
`;
