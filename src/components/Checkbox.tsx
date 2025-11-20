import { colors } from "@boxfoxs/bds-common";
import styled from "@emotion/styled";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import React, { HTMLProps } from "react";

interface Props
  extends Omit<HTMLProps<HTMLInputElement>, "onChange" | "value"> {
  value?: boolean;
  onChange: (value: boolean) => void;
  color?: string;
  box?: boolean;
}

export function Checkbox({ onChange, color, box = true, ...props }: Props) {
  return (
    <StyledCheckBox active={props.value} color={color} box={box}>
      <CheckIcon
        width={12}
        height={12}
        color={
          box ? colors.white : props.value ? colors.red500 : colors.gray300
        }
        strokeWidth={3}
      />
      <input
        {...props}
        hidden
        type="checkbox"
        value={String(props.value)}
        checked={props.value}
        onChange={(e) => onChange?.(e.currentTarget.checked)}
      />
    </StyledCheckBox>
  );
}

const StyledCheckBox = styled.label<{
  active?: boolean;
  color?: string;
  box?: boolean;
}>`
  display: flex;
  algin-items: center;
  justify-content: center;
  border-radius: 4px;
  padding-top: 2px;
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  ${(p) =>
    p.box
      ? `
    border: 1px solid ${colors.gray300};
    background-color: ${
      p.active ? p.color ?? colors.indigo500 : colors.transparent
    };
`
      : ""}
`;
