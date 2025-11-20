import { colors } from "@boxfoxs/bds-common";
import { Flex, Spacing, Text } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export function Step({ name }: { name: string }) {
  return (
    <Container>
      <Spacing width={6} />
      <ChevronRightIcon width={12} strokeWidth={4} color={colors.gray800} />
      <Spacing width={6} />
      <Text size="xs" weight="bold" color={colors.gray900}>
        {name}
      </Text>
    </Container>
  );
}

const Container = styled(Flex.Center)``;
