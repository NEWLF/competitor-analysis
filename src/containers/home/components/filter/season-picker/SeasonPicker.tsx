import styled from "@emotion/styled";
import { SEASONS } from "constants/options";
import { range } from "lodash";
import { useMemo } from "react";
import { Group } from "../../Group";
import { SelectItem } from "../../SelectItem";
import { SelectList } from "../mall-type-picker/SelectList";
import { Media } from "utils/Media";

interface Props {
  제품년도?: number;
  시즌?: string[] | "ALL";
  on제품년도Change?: (value: number) => void;
  on시즌Change?: (value: string[] | "ALL") => void;
}

export function SeasonPicker({
  제품년도,
  on제품년도Change,
  시즌,
  on시즌Change,
}: Props) {
  const today_month = new Date().getMonth();
  // console.log('today_month: ', today_month);

  const items = useMemo(() => {
    //12월이 되면 젤 마지막년도는 지우고 다음년도부터 불러옴 --ljy
    const currentYear = new Date().getFullYear();
    const startYear = today_month === 11 ? currentYear + 1 : currentYear;
    const endYear = today_month === 11 ? currentYear - 3 : currentYear - 4;
    return [...range(startYear, endYear), 9999];
  }, [today_month]);

  return (
    <Container>
      <Group title="제품년도">
        {items.map((year) => (
          <SelectItem
            radio
            value={제품년도 === year}
            onToggle={() => on제품년도Change(year)}
          >
            {year}
          </SelectItem>
        ))}
      </Group>
      <Group title="시즌">
        <SelectList items={SEASONS} value={시즌} onChange={on시즌Change} />
      </Group>
    </Container>
  );
}

const Container = styled.div`
  ${Media.screen("sm")(`display: flex;`)}
  grid-gap: 8px;
  & > * {
    width: 150px;
  }
`;
