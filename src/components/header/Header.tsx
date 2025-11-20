import { colors } from "@boxfoxs/bds-common";
import { Flex, inDesktop, Spacing, useCheckIsMobile } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { blackAndWhiteTheme } from "@/components/menu/blackAndWhiteTheme";
import { useBooleanState } from "hooks/useBooleanState";
import { last } from "lodash";
import React from "react";
import { NavMenu } from "../menu/NavMenu";
import { Step } from "./Step";

export function Header({ steps }: { steps: string[] }) {
  const isMobile = useCheckIsMobile();
  const [isOpen, , setFalse, toggle] = useBooleanState();
  const Icon = isOpen ? XMarkIcon : Bars3Icon;
  return (
    <Container>
      <NavMenu isShow={isOpen} setFalse={setFalse}/>
      <LeftNav isOpen={isOpen}>
        <MenuButton onClick={toggle}>
          <Icon
            width={40}
            strokeWidth={2}
            color={isOpen ? colors.white : colors.gray800}
          />
        </MenuButton>
      </LeftNav>
      {!isOpen &&
        (isMobile ? (
          <Step name={last(steps)} />
        ) : (
          <React.Fragment>
            <Spacing width={12} />
            <Logo src="/images/main_logo.svg" />
            {steps.map((name) => (
              <Step key={name} name={name} />
            ))}
          </React.Fragment>
        ))}
    </Container>
  );
}

const Container = styled(Flex.CenterVertical)`
  height: 50px;
`;

const Logo = styled.img`
  width: 160px;
`;

const MenuButton = styled.button`
  padding: 4px;
`;

const LeftNav = styled.div<{ isOpen?: boolean }>`
  ${(p) =>
    p.isOpen
      ? `
        width: 50px;
        ${inDesktop(`width: 240px;`)}
        background: ${blackAndWhiteTheme.backgroundColor.menu};
        `
      : ""}
`;
