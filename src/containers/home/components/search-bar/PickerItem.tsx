import { colors } from "@boxfoxs/bds-common";
import { Text } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Dropdown } from "@/components/layout";
import { useBooleanState } from "hooks/useBooleanState";
import { ReactNode } from "react";
import { pressableStyle } from "utils/style";

interface Props {
  label: string;
  onClick?: () => void;
  children?: ReactNode;
}

export function PickerItem({ label, onClick, children }: Props) {
  const [isOpen, open, close] = useBooleanState();
  return (
    <Container onClick={onClick ?? open}>
      <Text size="xxs" color={colors.gray600}>
        {label || "-"}
      </Text>
      <div style={{ flex: 1, minWidth: "8px" }}></div>
      <ChevronDownIcon width={14} color={colors.gray500} />
      <Dropdown open={isOpen} onClose={close}>
        <DropdownContentContainer>{children}</DropdownContentContainer>
      </Dropdown>
    </Container>
  );
}

const Container = styled.button`
    min-width: 100px;
    max-width: 240px;
    height: 100%;
    padding: 4px 12px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    white-space: nowrap;
    ${pressableStyle.opacity()}
    background: transparent;
    transition: background-color 120ms ease, box-shadow 120ms ease;
    &:hover {
        background: ${colors.gray200};
    }
`;

const DropdownContentContainer = styled.div`
  max-height: 500px;
  overflow: auto;
  padding: 8px;
`;
