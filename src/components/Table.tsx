import { colors } from "@boxfoxs/bds-common";
import styled from "@emotion/styled";

export const Table = styled.table`
  font-size: 12px;
  width: 100%;

  & > thead {
    background: ${colors.gray200};
    font-weight: bold;
  }
  th {
    padding: 4px;
  }
  td {
    padding: 4px;
    background: #fff;
  }
  background: ${colors.gray700};
  text-align: center;
  border: 0.5px solid ${colors.gray500};
  border-spacing: 0.5px;
`;
