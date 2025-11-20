import React from "react";
import styled from "@emotion/styled";

interface IToggleProps {
  label: string;
  value?: string | number;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Toggle({ label, value, checked, onChange }: IToggleProps) {
  return (
    <Label>
      <Checkbox
        role="switch"
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </Label>
  );
}

const Label = styled.label`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0px;

  span {
    font-size: 12px;
  }
`;

const Checkbox = styled.input`
  appearance: none;
  position: relative;
  border: max(2px, 0.1em) solid gray;
  border-radius: 1.25em;
  width: 3em;
  height: 2em;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    left: 4px;
    top: 3px;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    transform: scale(1.2);
    background-color: gray;
    transition: left 250ms linear;
  }

  &:checked {
    background-color: #f44336;
    border-color: #f44336;
  }

  &:checked::before {
    background-color: white;
    left: 13px;
  }

  &:focus-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) solid tomato;
  }
`;
