import { colors } from "@boxfoxs/bds-common";
import { Flex, Spacing, Text } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { hoverableStyle, pressableStyle } from "utils/style";

interface Props {
  value: string;
  onChange: (id: string) => void;
  items: string[];
}

export const Menu = React.memo(function Menu({
  value,
  onChange,
  items,
}: Props) {
  return (
    <Container>
      {items.map((label) => (
        <MenuItem active={value === label} onClick={() => onChange(label)}>
          {label}
        </MenuItem>
      ))}
    </Container>
  );
});

const Container = styled.div`
  height: 100%;
  overflow: auto;
`;

interface MenuItemProps {
  children?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

function MenuItem({ children, onClick, active }: MenuItemProps) {
  return (
    <MenuItemContainer onClick={onClick} active={active}>
      <Text size="xs" weight={active ? "semibold" : "regular"}>
        {children}
      </Text>
      <Spacing flex={1} />
      <ChevronRightIcon width={18} />
    </MenuItemContainer>
  );
}

const MenuItemContainer = styled(Flex.CenterVertical)<{ active?: boolean }>`
  ${hoverableStyle.background()}
  ${pressableStyle.opacity()}
  background: ${(p) => (p.active ? colors.gray100 : "none")};
  cursor: pointer;
  padding: 8px;
`;
