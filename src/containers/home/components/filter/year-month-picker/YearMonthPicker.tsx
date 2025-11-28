import { colors } from "@boxfoxs/bds-common";
import { Flex, inDesktop, Text } from "@boxfoxs/bds-web";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { withProps } from "@/components/hocs";
import { range } from "lodash";
import { pressableStyle } from "utils/style";
import styled from "@emotion/styled";
import { useState } from "react";

export interface YearMonthValue {
  year: number;
  month: number;
}

interface Props {
  value?: YearMonthValue;
  onChange: (value: YearMonthValue) => void;
  minValue?: YearMonthValue;
  maxValue?: YearMonthValue;
}

const BASE_MIN_YEAR = 2025;
const BASE_MIN_MONTH = 10;
const MOCK_TODAY: YearMonthValue | null = null;

// const MOCK_TODAY: YearMonthValue | null = { year: 2026, month: 5 };

const day = new Date().getDate();
const nowMonth = new Date().getMonth() + 1;
const realTodayMonth = day === 1 ? (nowMonth - 1 === 0 ? 12 : nowMonth - 1) : nowMonth;
const realTodayYear = new Date().getFullYear();

const todayMonth = MOCK_TODAY?.month ?? realTodayMonth;
const todayYear = MOCK_TODAY?.year ?? realTodayYear;

function isBefore(a: YearMonthValue, b: YearMonthValue) {
  return a.year < b.year || (a.year === b.year && a.month < b.month);
}

function isAfter(a: YearMonthValue, b: YearMonthValue) {
  return a.year > b.year || (a.year === b.year && a.month > b.month);
}

export function YearMonthPicker({ value, onChange, minValue, maxValue }: Props) {
  const initialYear = value?.year ?? todayYear;
  const [filterYear, setFilterYear] = useState(initialYear);

  const globalMin: YearMonthValue = {
    year: BASE_MIN_YEAR,
    month: BASE_MIN_MONTH,
  };

  const effectiveMin: YearMonthValue = (() => {
    if (!minValue) return globalMin;
    return isBefore(minValue, globalMin) ? globalMin : minValue;
  })();

  const globalMax: YearMonthValue = {
    year: todayYear,
    month: todayMonth,
  };

  const effectiveMax: YearMonthValue = (() => {
    if (!maxValue) return globalMax;
    return isAfter(maxValue, globalMax) ? globalMax : maxValue;
  })();

  const prevHandler = () => {
    setFilterYear((prev) => prev - 1);
  };

  const nextHandler = () => {
    setFilterYear((prev) => prev + 1);
  };

  const disabledByMin = (month: number) => {
    const current: YearMonthValue = { year: filterYear, month };
    return isBefore(current, effectiveMin);
  };

  const disabledByMax = (month: number) => {
    const current: YearMonthValue = { year: filterYear, month };
    return isAfter(current, effectiveMax);
  };

  const isDisabled = (month: number) => {
    return disabledByMin(month) || disabledByMax(month);
  };

  const isActive = (month: number) => {
    if (!value) return false;
    return value.year === filterYear && value.month === month;
  };

  return (
      <Container>
        <Header>
          <PrevButton isVisible={filterYear > effectiveMin.year} onClick={prevHandler}/>
          <Text weight="bold" color={colors.white} style={{ flex: 1 }} center>
            {filterYear}
          </Text>
          <NextButton
              onClick={nextHandler}
              style={{visibility: filterYear < effectiveMax.year ? "visible" : "hidden",}}
          />
        </Header>

        <MonthGrid>
          {range(1, 13).map((month) => {
            const disabled = isDisabled(month);
            const active = isActive(month);

            return (
                <DateButton
                    key={month}
                    type="button"
                    active={active}
                    disabled={disabled}
                    onClick={() => {
                      if (disabled) return;
                      onChange({ year: filterYear, month });
                    }}
                >
                  <Text
                      color={active ? colors.white : disabled ? colors.gray300 : colors.gray900}
                      size="xs"
                      weight={active ? "semibold" : "regular"}
                  >
                    {month}월
                  </Text>
                </DateButton>
            );
          })}
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
