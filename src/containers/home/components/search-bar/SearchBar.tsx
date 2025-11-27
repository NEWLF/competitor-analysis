import { colors } from "@boxfoxs/bds-common";
import { Flex, Spacing, Text, useCheckIsMobile } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDetailOrgs } from "hooks/useDetailOrgs";
import React from "react";
import { pressableStyle } from "utils/style";
import { useFilter, useTmpFilter } from "../../hooks";
import { YearMonthPicker } from "../filter";
import { CompetitorBrandPicker } from "../filter/competitorBrand";

import {
  getCountLabel,
  get시작년월Label,
  get종료년월Label,
  get조직Label,
  get경쟁사브랜드Label,
} from "../filter/modal/FilterResultSection";
import { useFilterModal } from "../filter/modal/useFilterModal";
import { LFBrandPicker } from "../filter/lfBrand/LfBrandPicker";
import { FilterField } from "./FilterField";
import { PickerItem } from "./PickerItem";
import { useCompetitorBrands } from "../../hooks/useCompetitorBrands";
import { useLFBrands } from "@/containers/home/hooks/useLFBrands";

export function SearchBar() {
  const [, setFilter] = useFilter();
  const [filter, put] = useTmpFilter();
  const open = useFilterModal();
  const isMobile = useCheckIsMobile();
  const { data: lfBrandOptions = [] } = useLFBrands();
  const { data: competitorBrandOptions = [] } = useCompetitorBrands();

  return (
    <Container
      onClickCapture={(e) => {
        if (isMobile) {
          e.stopPropagation();
          open();
        }
      }}
    >
      <PickerItem label={`From : ${get시작년월Label(filter)}`}>
        <YearMonthPicker
          value={filter.시작년월}
          onChange={(시작년월) => put({ 시작년월 })}
        />
      </PickerItem>
      <PickerItem label={`To : ${get종료년월Label(filter)}`}>
        <YearMonthPicker
          value={filter.종료년월}
          onChange={(종료년월) => put({ 종료년월 })}
        />
      </PickerItem>
      {!isMobile && (
        <React.Fragment>
          <PickerItem label={get조직Label(filter, lfBrandOptions)}>
            <LFBrandPicker
              items={lfBrandOptions}
              value={filter.조직}
              onChange={(조직) => put({ 조직 })}
            />
          </PickerItem>
          <PickerItem label={`${get경쟁사브랜드Label(filter, competitorBrandOptions)} ${getCountLabel(filter.경쟁사브랜드)}`}>
            <CompetitorBrandPicker
              items={competitorBrandOptions}
              value={filter.경쟁사브랜드}
              onChange={(v) => put({ 경쟁사브랜드: v })}
            />
          </PickerItem>
          <FilterField
            label={`카테고리`}
            value={filter.카테고리}
            onChange={(e) => put({ 카테고리: e.currentTarget.value })}
          />
          <FilterField
            label={`소재`}
            value={filter.소재}
            onChange={(e) => put({ 소재: e.currentTarget.value })}
          />
        </React.Fragment>
      )}
      <Flex.CenterVertical style={{ flex: 1 }}>
        <FilterField
          label={`상품명`}
          value={filter.상품명}
          onChange={(e) => put({ 상품명: e.currentTarget.value })}
        />
      </Flex.CenterVertical>
      <SearchButton onClick={() => setFilter(filter)}>
        <MagnifyingGlassIcon width={14} color={colors.white} />
        <Spacing width={8} />
        <Text color={colors.white} size="xs">
          조회
        </Text>
      </SearchButton>
    </Container>
  );
}

const Container = styled.div`
  height: 35px;
  background: ${colors.white};
  border-top: 1px solid ${colors.gray700};
  border-bottom: 1px solid ${colors.gray700};
  & > * + * {
    border-left: 1px solid ${colors.gray300};
  }
  display: flex;
`;

const SearchButton = styled.button`
  background: ${colors.gray900};
  padding: 4px 24px;
  ${pressableStyle.opacity()}
`;
