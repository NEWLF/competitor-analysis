import styled from "@emotion/styled";
import { Badge } from "antd";
import { NORMAL_LIST } from "constants/options";
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
        <ResultCell onClick={() => onMenuClick("시작년월")}>
            {get시작년월Label(value)}
        </ResultCell>
        <ResultCell onClick={() => onMenuClick("종료년월")}>
            {get종료년월Label(value)}
        </ResultCell>
        <ResultCell onClick={() => onMenuClick("조직")}>
            {get조직Label(value, orgs.data)}
        </ResultCell>
        <ResultCell count={getOptionCount(value.경쟁사브랜드)} onClick={() => onMenuClick("경쟁사브랜드")}>
            {get경쟁사브랜드Label(value)}
        </ResultCell>
    </Container>
  );
}

export function get시작년월Label(value: Filter) {
  return `${value.시작년월.year}/${value.시작년월.month
    .toString()
    .padStart(2, "0")}`;
}

export function get종료년월Label(value: Filter) {
    return `${value.종료년월.year}/${value.종료년월.month
        .toString()
        .padStart(2, "0")}`;
}

export function get조직Label(value: Filter, orgs: DetailOrg[]) {
    return value.조직 === "ALL" ? "전체" : orgs?.find((i) => i.ORG4_CODE === value.조직).name || "";
}

export function get경쟁사브랜드Label(value: Filter) {

    return value.경쟁사브랜드 === "ALL" ? "전체" : NORMAL_LIST?.find((i) =>  i.id === value.경쟁사브랜드[0])?.label || "";
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
