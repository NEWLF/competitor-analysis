import { colors } from "@boxfoxs/bds-common";
import { Text, useTextStyle } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { ComponentProps, ReactNode, useRef } from "react";
import { pressableStyle } from "utils/style";

interface Props extends ComponentProps<"input"> {
  label: string;
  children?: ReactNode;
}

export function FilterField({ children, ...props }: Props) {
  const ref = useRef<HTMLInputElement>();
  const style = useTextStyle({ size: "xxs", color: colors.gray700 });
  return (
    <Container onClick={() => ref.current?.focus()}>
      <Text size="xxs" color={colors.gray700}>
        {props.label} :
      </Text>
      <StyledInput style={style} ref={ref} {...props} />
      {children}
    </Container>
  );
}

const Container = styled.div`
  min-width: 100px;
  max-width: 240px;

  padding: 4px 12px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  ${pressableStyle.opacity()}
`;

const StyledInput = styled.input`
  flex: 1;
  width: auto;
  padding: 0 4px;
`;
