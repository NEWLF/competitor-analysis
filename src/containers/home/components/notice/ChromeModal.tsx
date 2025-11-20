import { Text, usePopup } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { Button, Modal } from "antd";
import { withProps } from "@/components/hocs";
import { useCallback, useEffect, useState } from "react";
import chrome_notice from "@assets/chrome_notice.png";

export function useChromeNoticeModal() {
  const { open, close } = usePopup("chrome-notice");

  return useCallback(() => {
    open({
      children: <ChromeNoticeModal onClose={close} />,
    });
  }, [open, close]);
}

const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 10px;
  }
`;

const EnhancedStyledModal = withProps(StyledModal, {
  open: true,
  footer: false,
  closeIcon: false,
  width: "650px",
  centered: true,
});

const NoticeBar = styled.div`
  width: 8px;
  height: 35px;
  background: black;
`;
const NoticeContainer = styled.div`
  width: 100%;
`;

const NoticeTitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContentContainer = styled.div``;

const SubImageContainer = styled.div`
  text-align: center;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: auto;
`;

const StyledButtonGray = styled(Button)`
  background-color: rgba(0, 0, 0, 0.1);
  width: 50%;
  height: 38px;
  font-weight: bold;
`;

const StyledButtonPrimary = styled(Button)`
  background-color: rgba(0, 0, 0, 1);
  width: 50%;
  height: 38px;
  font-weight: bold;
`;

function ChromeNoticeModal({ onClose }: { onClose: () => void }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleClose = () => {
    onClose();
    localStorage.setItem("modalClosedDate2", new Date().toLocaleDateString());
  };

  const handleSimpleClose = () => {
    onClose();
  };

  useEffect(() => {
    const now = new Date();
    const startDateTime = new Date("2025-04-15T09:00:00");
    const endDateTime = new Date("2025-04-23T18:00:00");
    const today = now.toISOString().slice(0, 10);
    const lastClosedDate = localStorage.getItem("modalClosedDate2");

    if (lastClosedDate === today) {
      setShowPopup(false);
    } else if (now >= startDateTime && now < endDateTime) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, []);

  if (!showPopup) return null;

  return (
    <EnhancedStyledModal onCancel={onClose}>
      <NoticeContainer>
        <NoticeTitleWrap>
          <NoticeBar />
          <Text size="lg" weight="bold">
            공지사항
          </Text>
        </NoticeTitleWrap>
        <ContentContainer>
          <SubImageContainer>
            <img
              src={chrome_notice.src}
              alt="크롬 공지사항"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </SubImageContainer>
          <ButtonGroup>
            <StyledButtonGray onClick={handleClose}>
              오늘 하루 닫기
            </StyledButtonGray>
            <StyledButtonPrimary type="primary" onClick={handleSimpleClose}>
              닫기
            </StyledButtonPrimary>
          </ButtonGroup>
        </ContentContainer>
      </NoticeContainer>
    </EnhancedStyledModal>
  );
}
