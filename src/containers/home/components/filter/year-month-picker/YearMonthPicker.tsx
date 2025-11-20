import { colors } from "@boxfoxs/bds-common";
import { Flex, inDesktop, Text } from "@boxfoxs/bds-web";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { withProps } from "@/components/hocs";
import { range } from "lodash";
import { pressableStyle } from "utils/style";
import styled from "@emotion/styled";
import { useState } from "react";

interface Props {
  value?: { year: number; month: number };
  onChange: (value: { year: number; month: number }) => void;
}

export function YearMonthPicker({ value, onChange }: Props) {
  const [filterYear, setFilterYear] = useState(value.year);

  const day = new Date().getDate();
  const now_month = new Date().getMonth() + 1;
  // 1일엔 전월 데이터 출력
  const today_month =
    day === 1 ? (now_month - 1 === 0 ? 12 : now_month - 1) : now_month;

  const today_year = new Date().getFullYear();

  const prevHandler = () => {
    setFilterYear((prev) => prev - 1);
  };

  const nextHandler = () => {
    setFilterYear((prev) => prev + 1);
  };

  const isActiveStart = (month) => {
    const GPT_PRODUCT_START_YEAR = 2024;
    const GPT_PRODUCT_START_MONTH = 8;
    return (
      filterYear === GPT_PRODUCT_START_YEAR && month < GPT_PRODUCT_START_MONTH
    );
  };

  const isNonActiveStart = (month) => {
    return (
      filterYear > today_year ||
      (filterYear === today_year && month > today_month)
    );
  };

  const isActive = (month) => {
    return month === value.month && value.year === filterYear;
  };

  return (
    <Container>
      <Header>
        <PrevButton isVisible={filterYear > 2024} onClick={prevHandler} />
        <Text weight="bold" color={colors.white} style={{ flex: 1 }} center>
          {filterYear}
        </Text>
        <NextButton onClick={nextHandler} />
      </Header>
      <MonthGrid>
        {range(1, 13).map((month) => (
          <DateButton
            key={month}
            onClick={() => {
              if (isActiveStart(month)) return;
              if (isNonActiveStart(month)) return;
              onChange({ year: filterYear, month: month });
            }}
            active={isActive(month)}
          >
            <Text
              color={
                isActive(month)
                  ? colors.white
                  : isActiveStart(month) || isNonActiveStart(month)
                  ? colors.gray300
                  : colors.gray900
              }
              size="xs"
              weight={isActive(month) ? "semibold" : "regular"}
            >
              {month}월
            </Text>
          </DateButton>
        ))}
      </MonthGrid>
    </Container>
  );
}

const Container = styled.div`
  ${inDesktop(`
    width: 250px;
  `)}
`;

const Header = styled(Flex.CenterVertical)`
  display: flex;
  align-items: center;
  background: ${colors.gray900};
  padding: 12px;
`;

const PrevButton = styled(
  withProps(ChevronLeftIcon, { width: 28, color: colors.gray100 }),
  {
    shouldForwardProp: (prop) => prop !== "isVisible",
  }
)<{ isVisible: boolean }>`
  padding: 4px;
  cursor: pointer;
  ${pressableStyle.opacity()}
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
`;

const NextButton = styled(
  withProps(ChevronRightIcon, { width: 28, color: colors.gray100 })
)`
  padding: 4px;
  cursor: pointer;
  ${pressableStyle.opacity()}
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const DateButton = styled.button<{ active?: boolean }>`
  padding: 8px;
  background: ${(p) => (p.active ? colors.red500 : "")};
`;
