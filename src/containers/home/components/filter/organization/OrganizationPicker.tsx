import styled from "@emotion/styled";
import { useDetailOrgs } from "hooks/useDetailOrgs";
import { useMemo } from "react";
import { toTree } from "utils/toTree";
import { Group } from "../../Group";
import { SelectItem } from "../../SelectItem";
import { Media } from "utils/Media";

interface Props {
  value: string;
  onChange: (value: string) => void;
  flat?: boolean;
}

export function OrganizationPicker({ flat, value, onChange }: Props) {
  const query = useDetailOrgs();
  const options = useMemo(() => toTree(query.data || []), [query.data]);

  return (
    <Container flat={flat}>
      {options?.[0]?.children.map((option) => (
        <Group title={option.name}>
          {option.children.map((department) => (
            <Group sub title={department.name}>
              {department.children.map((item) => (
                <SelectItem
                  radio
                  value={value === item.ORG4_CODE}
                  onToggle={() => onChange(item.ORG4_CODE)}
                >
                  {item.name}
                </SelectItem>
              ))}
            </Group>
          ))}
        </Group>
      ))}
    </Container>
  );
}

const Container = styled.div<{ flat?: boolean }>`
  ${(p) =>
    p.flat
      ? "display: flex;"
      : `
    display: grid;
    ${Media.screen("sm")(`grid-template-columns: 1fr 1fr;`)}
    ${Media.screen("md")(`grid-template-columns: 1fr 1fr 1fr;`)}
    ${Media.screen("lg")(`grid-template-columns: 1fr 1fr 1fr 1fr;`)}
  `}
  gap: 8px;
  align-items: start;
`;
