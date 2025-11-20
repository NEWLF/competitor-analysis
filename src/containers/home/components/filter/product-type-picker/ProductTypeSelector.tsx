import { colors } from "@boxfoxs/bds-common";
import { Flex, Spacing, Text } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { Checkbox } from "@/components/Checkbox";
import { useItems } from "hooks/useItems";
import { useMemo } from "react";
import { toTree } from "utils/toTree";
import { Group } from "../../Group";
import { SelectItem } from "../../SelectItem";
import { flatMap, uniq } from "lodash";
import { Media } from "utils/Media";

interface Props {
  value: string[] | "ALL";
  onChange: (value: string[] | "ALL") => void;
}

export function ProductTypeSelector({ value, onChange }: Props) {
  const items = useItems();
  const data = useMemo(() => toTree(items.data || []), [items.data]);

  const isCheckedAll =
    value === "ALL" ||
    flatMap(data.map((i) => i.children.map((c) => c.id))).every((id) =>
      value.includes(id)
    );

  const handleGroupSelect = (ids: string[]) => {
    const isCheckedAll =
      value === "ALL" || ids.every((id) => value.includes(id));
    onChange(
      value === "ALL"
        ? ids
        : isCheckedAll
        ? value.filter((id) => !ids.includes(id))
        : uniq([...value, ...ids])
    );
  };

  const handleItemSelect = (id: string) => {
    const isCheckedAll = value === "ALL" || value.includes(id);
    onChange(
      value === "ALL"
        ? [id]
        : isCheckedAll
        ? value.filter((i) => i !== id)
        : uniq([...value, id])
    );
  };

  return (
    <Container>
      <SelectAllButton
        active={isCheckedAll}
        onClick={() => onChange(isCheckedAll ? [] : "ALL")}
      />
      <Spacing height={8} />
      <GridContainer>
        {data?.[0]?.children.map((item) => {
          const ids = item.children.map((i) => i.id);
          const isCheckedAll =
            value === "ALL" || ids.every((id) => value.includes(id));
          return (
            <Group
              title={item.name}
              value={isCheckedAll}
              onSelect={() => handleGroupSelect(ids)}
            >
              {item.children.map((child) => (
                <SelectItem
                  value={isCheckedAll || value.includes(child.id)}
                  onToggle={() => handleItemSelect(child.id)}
                >
                  {child.name}
                </SelectItem>
              ))}
            </Group>
          );
        })}
      </GridContainer>
    </Container>
  );
}

const Container = styled.div``;

const GridContainer = styled.div`
  display: grid;
  grid-gap: 4px;
  ${Media.screen("sm")(`grid-template-columns: 1fr 1fr;`)}
  ${Media.screen("md")(`grid-template-columns: 1fr 1fr 1fr;`)}
  ${Media.screen("lg")(`grid-template-columns: 1fr 1fr 1fr 1fr;`)}
`;

function SelectAllButton({
  active,
  onClick,
}: {
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <SelectAllContainer onClick={onClick}>
      <Flex.CenterVertical style={{ width: "100%" }}>
        <Checkbox box={false} value={active} onChange={onClick} />
        <Spacing width={12} />
        <Text color={colors.white}>전체</Text>
      </Flex.CenterVertical>
    </SelectAllContainer>
  );
}

const SelectAllContainer = styled.button`
  padding: 8px 12px;
  width: 100%;
  text-align: left;
  background: ${colors.gray900};
`;
