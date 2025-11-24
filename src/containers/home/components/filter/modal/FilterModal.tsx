import { colors } from "@boxfoxs/bds-common";
import { inDesktop, Spacing, Text, useCheckIsMobile } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { Modal } from "antd";
import { withProps } from "@/components/hocs";
import { Menu } from "./menu";
import { useFilter, useTmpFilter } from "@/containers/home/hooks";
import { useState } from "react";
import { OrganizationPicker } from "../organization";
import { YearMonthPicker } from "../year-month-picker";
import { FilterResultSection } from "./FilterResultSection";
import { ModalHeader } from "./ModalHeader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { pressableStyle } from "utils/style";
import {NormalPicker} from "@/containers/home/components/filter/mall-type-picker";

interface Props {
  defaultTab?: string;
  onConfirm: () => void;
  onClose: () => void;
}

const MENU_ITEMS = {
  시작년월: ({
    controls: [filter, put],
  }: {
    controls: ReturnType<typeof useFilter>;
  }) => (
    <YearMonthPicker
      value={filter.시작년월}
      onChange={(시작년월) => put({ 시작년월 })}
    />
  ),
  종료년월: ({
    controls: [filter, put],
  }: {
    controls: ReturnType<typeof useFilter>;
  }) => (
    <YearMonthPicker
      value={filter.종료년월}
      onChange={(종료년월) => put({ 종료년월 })}
    />
  ),
  조직: ({
    controls: [filter, put],
  }: {
    controls: ReturnType<typeof useFilter>;
  }) => (
    <OrganizationPicker
      value={filter.조직}
      onChange={(조직) => put({ 조직 })}
    />
  ),
  ["경쟁사브랜드"]: ({
       controls: [filter, put],
     }: {
    controls: ReturnType<typeof useFilter>;
  }) => (
      <NormalPicker
          value={filter.경쟁사브랜드}
          onChange={(경쟁사브랜드) => put({경쟁사브랜드})}/>
  ),
};

export function FilterModal({ defaultTab, onClose }: Props) {
  const [, setFilter] = useFilter();
  const controls = useTmpFilter();
  const [filter] = controls;
  const [menu, setMenu] = useState(defaultTab || "시작년월");
  const isMobile = useCheckIsMobile();

  const Content = MENU_ITEMS[menu];

  return (
    <StyledModal onCancel={onClose}>
      <ModalHeader title="조회필터" onClose={onClose} />
      <ContentContainer>
        <div>
          <SectionHeader>조건명</SectionHeader>
          <Menu
            value={menu}
            onChange={setMenu}
            items={Object.keys(MENU_ITEMS)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SectionHeader>세부 항목 설정</SectionHeader>
          <InnerContainer>
            <Content controls={controls} />
          </InnerContainer>
        </div>
        {!isMobile && (
          <RightContainer>
            <SectionHeader>선택</SectionHeader>
            <FilterResultSection value={filter} onMenuClick={setMenu} />
            <Spacing flex={1} />
            <div style={{ paddingLeft: "8px" }}>
              <SearchButton
                onClick={() => {
                  setFilter(filter);
                  onClose();
                }}
              />
            </div>
          </RightContainer>
        )}
      </ContentContainer>
      {isMobile && (
        <SearchButton
          onClick={() => {
            setFilter(filter);
            onClose();
          }}
        />
      )}
    </StyledModal>
  );
}

function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <StyledSearchButton onClick={onClick}>
      <MagnifyingGlassIcon width={14} color={colors.white} />
      <Spacing width={8} />
      <Text color={colors.white} weight="bold">
        조회
      </Text>
    </StyledSearchButton>
  );
}
const StyledSearchButton = styled.button`
  background: ${colors.gray900};
  padding: 12px 12px;
  width: 100%;
  margin-top: 12px;
  ${pressableStyle.opacity()}
`;

const StyledModal = withProps(Modal, {
  open: true,
  footer: false,
  closeIcon: false,
  styles: { content: { padding: "8px" }, wrapper: {} },
  width: "1100px",
});

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  ${inDesktop(`grid-template-columns: 200px 1fr 170px;`)}
  & > * + * {
    border-left: 1px solid ${colors.gray200};
  }
  & > * {
    height: 70vh;
  }
`;

const SectionHeader = styled(withProps(Text, { weight: "bold" }))`
  padding: 8px;
  border-bottom: 1px solid ${colors.gray200};
`;

const InnerContainer = styled.div`
  overflow: auto;
  height: 100%;
  flex: 1;
`;

const RightContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
