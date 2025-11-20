import { Modal } from "antd";
import { withProps } from "@/components/hocs";
import { CustomerStatTable } from "./CustomerStatTable";
import { ModalHeader } from "../filter/modal/ModalHeader";
import { Spacing } from "@boxfoxs/bds-web";
import { useCustomerData } from "hooks/useCustomerData";

export function CustomerStatModal({ onClose }: { onClose: () => void }) {
  const query = useCustomerData();

  return (
    <StyledModal>
      <ModalHeader title="고객 상세 팝업" onClose={onClose} />
      <Spacing height={12} />
      <CustomerStatTable loading={query.isLoading} data={query.data} />
    </StyledModal>
  );
}

const StyledModal = withProps(Modal, {
  open: true,
  footer: false,
  closeIcon: false,
  styles: { content: { padding: "8px" } },
  width: "1000px",
});
