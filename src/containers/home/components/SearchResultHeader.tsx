import { colors } from "@boxfoxs/bds-common";
import { inDesktop, Spacing, Text } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { format, parse } from "date-fns";
import { useLastUpdateDate } from "hooks/useStatistics";
import { pressableStyle } from "utils/style";

export function SearchResultHeader({
  onClickExportExcel,
  isLoading,
}: {
  onClickExportExcel: () => void;
  isLoading?: boolean;
}) {
  const lastUpdateDate = useLastUpdateDate();

  return (
    <Container>
      <Spacing flex={2} />
      <CustomerButton
        onClick={onClickExportExcel}
        color={colors.gray900}
        disabled={isLoading}
      >
        <ButtonContent>
          {isLoading && <Spinner />}
          EXCEL DOWN
        </ButtonContent>
      </CustomerButton>
      <Text size="xxs" color={colors.gray800} center weight="extrabold">
        Last updated :{" "}
        {lastUpdateDate?.data?.ANAL_DATE
          ? format(
              parse(lastUpdateDate?.data?.ANAL_DATE, "yyyyMMdd", new Date()),
              "yyyy.MM.dd"
            )
          : ""}
      </Text>
    </Container>
  );
}

const Container = styled.div`
  padding: 0px 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 4px;
  ${inDesktop(`
  	padding: 15px 20px;
    flex-direction: row;
  `)}
`;

const CustomerButton = styled.button`
  background: ${colors.gray900};
  padding: 6px 13px;
  margin-right: 10px;
  border-radius: 4px;
  font-size: 11px;
  color: ${colors.white};
  ${pressableStyle.opacity()};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:disabled:active {
    opacity: 0.6;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: ${colors.white};
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
