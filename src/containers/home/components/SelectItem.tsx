import { colors } from "@boxfoxs/bds-common";
import { Flex, Text } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { Checkbox } from "@/components/Checkbox";
import { hoverableStyle, pressableStyle } from "utils/style";

interface Props {
  children: React.ReactNode;
  radio?: boolean;
  center?: boolean;
  checkbox?: boolean;
  value?: boolean;
  onToggle?: () => void;
}

export function SelectItem({
  radio,
  checkbox,
  children,
  center = true,
  value,
  onToggle,
}: Props) {
  return (
    <Container onClick={onToggle}>
      <CheckboxContaer>
        {radio ? (
          <Radio active={value} />
        ) : (
          <Checkbox
            box={checkbox === true}
            value={value}
            onChange={onToggle}
            color={colors.red500}
            size={12}
          />
        )}
      </CheckboxContaer>
      <Text
        size="xxs"
        weight="medium"
        style={{
          flex: 1,
          margin: "0 20px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: center ? "center" : "left",
          paddingLeft: center ? "0" : "8px",
        }}
      >
        {children}
      </Text>
    </Container>
  );
}

const Container = styled.button`
  ${hoverableStyle.background(colors.gray100)}
  ${pressableStyle.opacity()}
  width: 100%;
  min-width: 150px;
  cursor: pointer;
  padding: 8px;
  position: relative;
`;

const Radio = styled.div<{ active?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: ${(p) => (p.active ? colors.red500 : colors.gray300)};
`;

const CheckboxContaer = styled(Flex.Center)`
  position: absolute;
  left: 8px;
  height: 100%;
`;
