import { useRef } from "react";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";

export function ScrollToTopButton() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const timerRef = useRef<unknown | null>(null);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      // @ts-ignore
      behavior: "instant",
    });
  };

  return (
    <Button ref={buttonRef} onClick={handleClick}>
      <FontAwesomeIcon icon={faArrowUp} size="xl" />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 20px;
  right: 16px;
  z-index: 1;
  float: right;
  background-color: white;
  border: solid 1px var(--color-light-gray);
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: #3c4a5f;
  color: #fff;
  transition: opacity 0.1s ease-in-out;
`;
