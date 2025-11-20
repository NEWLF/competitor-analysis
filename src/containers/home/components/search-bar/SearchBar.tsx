import { colors } from "@boxfoxs/bds-common";
import { Flex, Spacing, Text, useCheckIsMobile } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDetailOrgs } from "hooks/useDetailOrgs";
import { useItems } from "hooks/useItems";
import React, { useEffect, useMemo, useState } from "react";
import { pressableStyle } from "utils/style";
import { useFilter, useTmpFilter } from "../../hooks";
import { YearMonthPicker } from "../filter";
import { LiveSTCLPicker, NormalPicker } from "../filter/mall-type-picker";
import {
  getCountLabel,
  get기준월Label,
  get정상재생산Label,
  get제품년도,
  get조직Label,
  get품목Label,
  getLiveSTCL,
} from "../filter/modal/FilterResultSection";
import { useFilterModal } from "../filter/modal/useFilterModal";
import { OrganizationPicker } from "../filter/organization";
import { ProductTypeSelector } from "../filter/product-type-picker";
import { FilterField } from "./FilterField";
import { PickerItem } from "./PickerItem";
import { STCLField } from "./STCLField";

export function SearchBar() {
  const [, setFilter] = useFilter();
  const [filter, put] = useTmpFilter();
  const open = useFilterModal();
  const isMobile = useCheckIsMobile();
  const orgs = useDetailOrgs();
  const items = useItems();

  const isFilter = useMemo(
    () =>
      filter.조직 === "G1_BPU78" ||
      filter.조직 === "CJ" ||
      filter.조직 === "CB",
    [filter]
  );

  useEffect(() => {
    if (!isFilter) {
      put({ liveSTCL: "N" });
    } else {
      put({ liveSTCL: "Y" });
    }
  }, [isFilter]);

  return (
    <Container
      onClickCapture={(e) => {
        if (isMobile) {
          e.stopPropagation();
          open();
        }
      }}
    >
      <PickerItem label={`기준월 : ${get기준월Label(filter)}`}>
        <YearMonthPicker
          value={filter.기준월}
          onChange={(기준월) => put({ 기준월 })}
        />
      </PickerItem>
      {!isMobile && (
        <React.Fragment>
          <PickerItem label={get조직Label(filter, orgs.data)}>
            <OrganizationPicker
              flat
              value={filter.조직}
              onChange={(조직) => put({ 조직 })}
            />
          </PickerItem>
          <PickerItem
            label={`품목: ${get품목Label(filter, items.data)} ${getCountLabel(
              filter.품목
            )}`}
          >
            <ProductTypeSelector
              value={filter.품목}
              onChange={(품목) => put({ 품목 })}
            />
          </PickerItem>
          {/* <PickerItem
            label={`몰구분: ${get자사제휴몰Label(filter)} ${getCountLabel(
              filter.자사제휴몰
            )}`}
          >
            <MallTypePicker
              value={filter.자사제휴몰}
              onChange={(자사제휴몰) => put({ 자사제휴몰 })}
            />
          </PickerItem> */}
          <Tooltip data-tooltip="정상/재생산">
            <PickerItem label={`${get정상재생산Label(filter)} ${getCountLabel(filter.정상재생산)}`}>
              <NormalPicker
                  value={filter.정상재생산}
                  onChange={(정상재생산) => put({ 정상재생산 })}
              />
            </PickerItem>
          </Tooltip>
          <STCLField
            value={filter.STCL}
            onChange={(value) => {
              put({ STCL: value });
            }}
            onEnter={(value: string) => {
              put({ STCL: value });
              setFilter({ ...filter, STCL: value });
            }}
          />
          <FilterField
            label={`키워드`}
            value={filter.키워드}
            onChange={(e) => put({ 키워드: e.currentTarget.value })}
          />
        </React.Fragment>
      )}
      <Flex.CenterVertical style={{ flex: 1 }}>
        <PickerItem
          label={`${get제품년도(filter)}`}
          onClick={() => open("제품년도/시즌")}
        />
      </Flex.CenterVertical>
      {isFilter && (
        <PickerItem label={getLiveSTCL(filter)}>
          <LiveSTCLPicker
            value={filter.liveSTCL}
            onChange={(e) => put({ liveSTCL: e })}
          />
        </PickerItem>
      )}
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

const Tooltip = styled.span<{ 'data-tooltip'?: string }>`
  position: relative;
  display: flex;

  /* 요소 위(ABOVE)에 그대로 두고, 등장 모션만 '아래 -> 위'로 */
  &[data-tooltip]::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 8px);     /* 위에 배치 유지 */
    left: 50%;
    transform: translate(-50%, 8px); /* 초기: 아래쪽에서 시작 */
    background: #000;
    color: #fff;
    padding: 6px 12px;
    border-radius: 999px;         /* pill */
    font-size: 12px;
    line-height: 1;
    white-space: nowrap;
    z-index: 1100;
    opacity: 0;
    pointer-events: none;
    will-change: transform, opacity;
  }

  &[data-tooltip]::before {
    content: '';
    position: absolute;
    bottom: calc(100% - 1.5px);
    left: 50%;
    transform: translate(-50%, 8px); /* 초기: 아래쪽에서 시작 */
    border: 5px solid transparent;
    border-top-color: #000;   /* 포인터(삼각형) */
    z-index: 1099;
    opacity: 0;
    pointer-events: none;
  }

  /* hover 시 '아래에서 위로' 상승 */
  &[data-tooltip]:hover::before,
  &[data-tooltip]:hover::after {
    opacity: 1;
    animation: tooltip-rise-from-below 160ms ease-out forwards;
  }

  @keyframes tooltip-rise-from-below {
    to {
      opacity: .98;
      transform: translate(-50%, 0); /* 아래(+)에서 0으로 → 위로 올라오는 효과 */
    }
  }
`;
