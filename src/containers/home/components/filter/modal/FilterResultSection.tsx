import {
  CompetitorBrandOption,
  useCompetitorBrands,
} from "@/containers/home/hooks/useCompetitorBrands";
import styled from "@emotion/styled";
import { Badge } from "antd";
import { useDetailOrgs } from "hooks/useDetailOrgs";
import { useItems } from "hooks/useItems";
import { DetailOrg, Item } from "remotes/legacy";
import { Filter } from "types/Filter";
import { pressableStyle } from "utils/style";
import {useLFBrands} from "@/containers/home/hooks/useLFBrands";

interface Props {
  value: Filter;
  onMenuClick: (key: string) => void;
}

export function FilterResultSection({ value, onMenuClick }: Props) {
    const { data: lfBrandOptions = [] } = useLFBrands();
    const orgs = useDetailOrgs();
    const compbrand = useCompetitorBrands();
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
            {get조직Label(value, lfBrandOptions)}
        </ResultCell>
      <ResultCell
        count={getOptionCount(value.경쟁사브랜드)}
        onClick={() => onMenuClick("경쟁사브랜드")}
      >
        {get경쟁사브랜드Label(value, compbrand.data)}
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

export function get조직Label(value: Filter, lfBrandOptions: { id: string; label: string }[] = []) {
    return lfBrandOptions.find((i) => i.id === value.조직)?.label || "";
}

export function get경쟁사브랜드Label(
  value: Filter,
  brand: CompetitorBrandOption[]
) {
  return value.경쟁사브랜드 === "ALL"
    ? "전체"
    : brand?.find((i) => i.id === value.경쟁사브랜드[0])?.label || "";
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
