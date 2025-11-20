import { colors } from "@boxfoxs/bds-common";
import styled from "@emotion/styled";

export const StyledTextArea = styled.textarea`
  background: ${colors.gray100};
  padding: 16px;
  width: 100%;
  min-height: 100px;
  font-size: 16px;
  color: ${colors.black};
  &::placeholder {
    color: ${colors.gray800};
  }
`;

export const StyledInput = styled.input`
  background: ${colors.gray100};
  padding: 16px;
  width: 100%;
  min-height: 100px;
  font-size: 16px;
  color: ${colors.black};
  &::placeholder {
    color: ${colors.gray800};
  }
`;
