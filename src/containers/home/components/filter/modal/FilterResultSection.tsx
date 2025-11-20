import styled from "@emotion/styled";
import { Badge } from "antd";
import { liveSTCL, MALL_LIST, NORMAL_LIST, SEASONS } from "constants/options";
import { useDetailOrgs } from "hooks/useDetailOrgs";
import { useItems } from "hooks/useItems";
import { DetailOrg, Item } from "remotes/legacy";
import { Filter } from "types/Filter";
import { pressableStyle } from "utils/style";

interface Props {
  value: Filter;
  onMenuClick: (key: string) => void;
}

export function FilterResultSection({ value, onMenuClick }: Props) {
  const orgs = useDetailOrgs();
  const items = useItems();

  return (
    <Container>
      <ResultCell onClick={() => onMenuClick("기준월")}>
        {get기준월Label(value)}
      </ResultCell>
      <ResultCell onClick={() => onMenuClick("조직")}>
        {get조직Label(value, orgs.data)}
      </ResultCell>
      <ResultCell
        count={getOptionCount(value.품목)}
        onClick={() => onMenuClick("품목")}
      >
        {get품목Label(value, items.data)}
      </ResultCell>
      {/* <ResultCell
        count={getOptionCount(value.자사제휴몰)}
        onClick={() => onMenuClick("자사제휴몰")}
      >
        {get자사제휴몰Label(value)}
      </ResultCell> */}
      <ResultCell
        count={getOptionCount(value.정상재생산)}
        onClick={() => onMenuClick("정상/재생산")}
      >
        {get정상재생산Label(value)}
      </ResultCell>      <ResultCell
        count={getOptionCount(value.정상재생산)}
        onClick={() => onMenuClick("정상/재생산")}
      >
        {get정상재생산Label(value)}
      </ResultCell>

      <ResultCell
        count={getOptionCount(value.시즌)}
        onClick={() => onMenuClick("제품년도/시즌")}
      >
        {get제품년도(value)}
      </ResultCell>
    </Container>
  );
}

export function get기준월Label(value: Filter) {
  return `${value.기준월.year}/${value.기준월.month
    .toString()
    .padStart(2, "0")}`;
}

export function get조직Label(value: Filter, orgs: DetailOrg[]) {
  return value.조직 === "ALL"
    ? "전체"
    : orgs?.find((i) => i.ORG4_CODE === value.조직).name || "";
}

export function get품목Label(value: Filter, items: Item[]) {
  return value.품목 === "ALL"
    ? "전체"
    : items?.find((i) => value.품목.includes(i.id))?.name || "";
}

export function get자사제휴몰Label(value: Filter) {
  return value.자사제휴몰 === "ALL"
    ? "전체"
    : MALL_LIST.find((i) => value.자사제휴몰.includes(i.id))?.label;
}

export function get정상재생산Label(value: Filter) {
  return value.정상재생산 === "ALL"
    ? "전체"
    : NORMAL_LIST.find((i) => value.정상재생산.includes(i.id))?.label || "";
}
export function get제품년도(value: Filter) {
  return `[ ${value.제품년도} ]${
    value.시즌 === "ALL"
      ? ""
      : ` [ ${
          SEASONS.find((i) => value.시즌.includes(i.id))?.label || "-"
        }${getCountLabel(value.시즌)} ]`
  }`;
}

export function getLiveSTCL(value: Filter) {
  return `${liveSTCL.find((i) => value.liveSTCL.includes(i.id))?.label}`;
}

export function getCountLabel<T>(value: T[] | "ALL") {
  const count = getOptionCount(value);
  if (count < 2) {
    return "";
  }
  return `+${count}`;
}

export function getOptionCount<T>(value: T[] | "ALL") {
  if (!value || value === "ALL") {
    return 0;
  }
  return value.length;
}

const Container = styled.div`
  width: 100%;
  padding: 16px;
`;

function ResultCell({
  children,
  count,
  onClick,
}: {
  children: React.ReactNode;
  count?: number;
  onClick?: () => void;
}) {
  return (
    <Badge
      count={count && count > 1 ? `+${count}` : ""}
      styles={{ root: { width: "100%" } }}
    >
      <CellContainer onClick={onClick}>{children || "-"}</CellContainer>
    </Badge>
  );
}

const CellContainer = styled.button`
  width: 100%;
  padding: 5px 0px;
  margin-bottom: 10px;
  background: rgb(150, 150, 150);
  border-radius: 20px;
  color: rgb(255, 255, 255);
  font-size: 12px;
  position: relative;
  text-align: center;
  cursor: pointer;
  ${pressableStyle.opacity()}
`;
