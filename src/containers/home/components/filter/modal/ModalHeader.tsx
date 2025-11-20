import { colors } from "@boxfoxs/bds-common";
import { Flex, Spacing, Text } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { withProps } from "@/components/hocs";
import { pressableStyle } from "utils/style";

export function ModalHeader({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <Header>
      <Text size="lg" weight="semibold" color={colors.white}>
        {title}
      </Text>
      <Spacing flex={1} />
      <XIcon onClick={onClose} />
    </Header>
  );
}

const Header = styled(Flex.CenterVertical)`
  background: ${colors.gray900};
  padding: 12px;
`;

const XIcon = styled(withProps(XMarkIcon, { width: 24, color: colors.white }))`
  cursor: pointer;
  ${pressableStyle.scale()}
`;
