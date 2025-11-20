import { colors } from "@boxfoxs/bds-common";
import { Flex, Text } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { Checkbox } from "@/components/Checkbox";
import { withProps } from "@/components/hocs";
import { ReactNode } from "react";
import { pressableStyle } from "utils/style";

interface Props {
  sub?: boolean;
  title: string;
  children?: ReactNode;
  value?: boolean;
  onSelect?: () => void;
}
export function Group({ title, sub, children, value, onSelect }: Props) {
  return (
    <Container>
      <Header sub={sub} selectable={!!onSelect} onClick={onSelect}>
        {!!onSelect && (
          <CheckboxContaer>
            <Checkbox box={false} value={value} onChange={console.log} />
          </CheckboxContaer>
        )}
        {title}
      </Header>
      {children}
    </Container>
  );
}

const Container = styled.div`
  max-width: 200px;
  min-width: 120px;
  width: 100%;
  border: 0.5px solid ${colors.gray300};
`;
const Header = styled(
  withProps(Text, {
    color: "currentColor",
    center: true,
    size: "xxs",
  })
)<{ sub?: boolean; selectable?: boolean }>`
  background: ${(p) => (p.sub ? colors.gray400 : colors.gray900)};
  color: ${(p) => (p.sub ? colors.gray900 : colors.white)} !important;
  height: 36px;
  display: flex;
  align-text: center;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  position: relative;
  ${(p) =>
    p.selectable
      ? `
      cursor: pointer;
      ${pressableStyle.opacity()}
    `
      : ""}
`;

const CheckboxContaer = styled.div`
  position: absolute;
  top: 10px;
  left: 8px;
`;
