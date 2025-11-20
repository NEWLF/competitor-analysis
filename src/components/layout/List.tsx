import { Divider } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { flattenDeep } from "lodash";
import React, { ComponentProps, ReactNode, useMemo } from "react";

interface Props extends ComponentProps<"div"> {
  children: ReactNode;
  divider?: boolean | ReactNode;
}

export function List({ divider, children, ...props }: Props) {
  const getDivider = () => {
    if (typeof divider === "boolean") {
      return <Divider marginHorizontal={28} />;
    }
    return divider;
  };
  return (
    <Container {...props}>
      {Array.isArray(children)
        ? flattenDeep(children)
            .filter((item) => !!item)
            .map((item, idx) => (
              <React.Fragment key={getKey(item) ?? idx}>
                {Boolean(idx > 0) && getDivider()}
                {item}
              </React.Fragment>
            ))
        : children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

List.Horizontal = function HorizontalList({
  divider: rawDivider,
  ...props
}: Props) {
  const divider = useMemo(() => {
    if (rawDivider === true) {
      return <Divider width={1} style={{ height: "100%" }} />;
    }
    if (!rawDivider) {
      return undefined;
    }
    return rawDivider;
  }, [rawDivider]);

  return (
    <List
      divider={divider}
      {...props}
      style={{ flexDirection: "row", ...props.style }}
    />
  );
};

function getKey(item: ReactNode) {
  if (item != null && typeof item === "object" && "key" in item) {
    return item.key;
  }
}
