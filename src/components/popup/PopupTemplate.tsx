import styled from "@emotion/styled";
import { blackAndWhiteTheme } from "@/components/menu/blackAndWhiteTheme";
import { ModalHeader } from "@/containers/home/components/filter/modal/ModalHeader";
import { CSSProperties, ReactNode, useState } from "react";

const Wrap = styled.section<{
  isFilter?: boolean;
  isHorizen?: boolean;
  options?: CSSProperties;
}>`
  width: 100%;
  height: 100%;
  background: #fff;

  .popup {
    width: 100%;
    height: 100%;
  }

  .popup .container {
    width: ${(props) => props?.options?.width && props.options.width};
    height: ${(props) => {
      if (props?.isFilter) return "100%";
      return props?.options?.height ? props.options.height : "100%";
    }};
    max-width: ${(props) => props?.options?.maxWidth && props.options.maxWidth};
    max-height: ${(props) =>
      props?.options?.maxHeight && props.options.maxHeight};
    box-sizing: border-box;
    padding: 5px;
  }

  .popup .container .top-content {
    font-size: 18px;
    padding: 8px 10px;
    margin-bottom: 4px;
    background: ${blackAndWhiteTheme.backgroundColor.point3};
    color: #fff;
    font-weight: 800;
    border-bottom: 3px solid #888;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
  }

  .popup .container .top-content2 {
    font-size: 16px;
    padding: 4px 10px;
    background: ${blackAndWhiteTheme.backgroundColor.point5};
    color: ${blackAndWhiteTheme.backgroundColor.title};
    font-weight: 800;
    border: 1px solid black;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    margin-bottom: 3px;
  }

  .popup .container .top-content h1 svg {
    width: 16px;
    height: 16px;
    fill: #fff;
  }

  .popup .container .top-content .close-btn {
    display: block;
    width: 30px;
    height: 30px;
    padding: 0;
  }

  .popup .container .top-content .close-btn svg {
    width: 100%;
    fill: #fff;
  }

  .popup .container .top-content2 h1 svg {
    width: 16px;
    height: 16px;
    fill: #fff;
  }

  .popup .container .top-content2 .close-btn2 {
    display: block;
    width: 30px;
    height: 30px;
    padding: 0;
  }

  .popup .container .top-content2 .close-btn2 svg {
    width: 100%;
    fill: ${({ ...props }) =>
      props.theme === blackAndWhiteTheme ? "#222" : "#fff"};
  }

  .popup .container .nobtnWrap {
    display: none;
  }

  .popup .container .btnwrap {
    display: block;
    display: flex;
    position: absolute;
    right: 50px;
  }

  .popup .container .btnwrap .window {
    display: block;
    fill: ${({ ...props }) =>
      props.theme === blackAndWhiteTheme ? "#222" : "#fff"};
    margin-left: 5px;
  }

  .popup .container .content-title {
    padding: 5px 15px;
    padding: 10px 15px;
    font-size: 15px;
    font-weight: 800;
    border-bottom: 1px solid #d2d2d2;
    color: #203c4a;
    position: relative;
  }

  .popup .container .content-title .reset-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    width: 16px;
    height: 16px;
  }

  .popup .container .content-title .reset-btn svg {
    width: 100%;
    fill: ${blackAndWhiteTheme.color.point1};
    transform: scaleX(-1) rotate(0deg);
    transition: transform 0.2s ease-in-out;
  }

  .popup .container .content-wrap {
    display: ${({ ...props }) => (props.isHorizen ? "flex" : "block")};
    width: 100%;
    height: 100%;
    max-height: ${(props) =>
      props.isFilter ? "calc(100% - 54px)" : "calc(100% - 44px)"};
    border: 1px solid #d2d2d2;
    box-sizing: border-box;
    justify-content: center;
  }

  .inquiry .container .content-wrap .left-content {
    width: 15%;
    min-width: 150px;
    min-width: 170px;
    border-right: 1px solid #d2d2d2;
    overflow: hidden;
  }

  .inquiry .container .content-wrap .left-content ul {
    font-size: 12px;
    font-weight: 700;
    width: 100%;
    height: calc(100% - 44px);
    box-sizing: border-box;
    overflow: auto;
  }

  .inquiry .container .content-wrap .left-content ul li button.inquiry-btn {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 15px;
    position: relative;
    color: #575757;
  }

  .inquiry
    .container
    .content-wrap
    .left-content
    ul
    li
    button.inquiry-btn::after {
    position: absolute;
    content: "";
    width: 7px;
    height: 7px;
    right: 18px;
    border: 2px solid #d2d2d2;
    top: 50%;
    transform: translateY(-50%) rotate(-135deg);
    border-top: 0;
    border-right: 0;
  }

  .inquiry
    .container
    .content-wrap
    .left-content
    ul
    li.active
    button.inquiry-btn {
    background-color: rgba(0, 0, 0, 0.03);
    color: ${blackAndWhiteTheme.color.point1};
  }

  .inquiry
    .container
    .content-wrap
    .left-content
    ul
    li.active
    button.inquiry-btn::after {
    border-left: 2px solid ${blackAndWhiteTheme.color.point1};
    border-bottom: 2px solid ${blackAndWhiteTheme.color.point1};
  }

  .inquiry .container .content-wrap .main-content {
    border-right: 1px solid #d2d2d2;
    position: relative;
  }

  .inquiry .container .content-wrap .main-content .tab-wrap {
    position: relative;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    height: calc(100% - 44px);
    overflow: auto;
  }

  .inquiry .container .content-wrap .main-content .tab-wrap::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  }

  .inquiry
    .container
    .content-wrap
    .main-content
    .tab-wrap::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 10px;
  }

  .inquiry .container .content-wrap .main-content .tab-wrap .filter-wrap {
    display: none;
  }

  .inquiry .container .content-wrap .main-content .tab-wrap .filter-wrap {
    display: flex;
  }

  .inquiry .container .content-wrap .right-content {
    width: 15%;
    min-width: 150px;
    min-width: 170px;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .inquiry .container .content-wrap .right-content .condition-list {
    padding: 10px 15px 0;
    overflow: auto;
    margin-bottom: 46px;
  }

  .inquiry .container .content-wrap .right-content .condition-list li {
    width: 100%;
    padding: 5px 0;
    margin-bottom: 10px;
    background: #969696;
    border-radius: 20px;
    color: #fff;
    font-size: 12px;
    position: relative;
    text-align: center;
    cursor: pointer;
  }

  .inquiry
    .container
    .content-wrap
    .right-content
    .condition-list
    li
    .condition-additional {
    background: #e60012;
    padding: 0 3px;
    border-radius: 5px;
    border: 1px solid #fff;
    position: absolute;
    top: -10px;
    right: 0;
    transition: 0.3s all ease;
    -webkit-transition: 0.3s all ease;
  }

  .inquiry
    .container
    .content-wrap
    .right-content
    .condition-list
    li
    .condition-reset-btn {
    display: none;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background: #d2d2d2;
    position: absolute;
    top: -8px;
    right: -5px;
  }

  .inquiry
    .container
    .content-wrap
    .right-content
    .condition-list
    li
    .condition-reset-btn
    svg {
    width: 10px;
    fill: #fff;
  }

  .inquiry .container .content-wrap .right-content .condition-list li:hover {
    background: #e60012;
  }

  .inquiry
    .container
    .content-wrap
    .right-content
    .condition-list
    li:hover
    .condition-additional {
    right: 15px;
  }

  .inquiry
    .container
    .content-wrap
    .right-content
    .condition-list
    li:hover
    .condition-reset-btn {
    display: block;
  }

  .inquiry .container .content-wrap .right-content .inquiry-btn {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: ${blackAndWhiteTheme.backgroundColor.point1};
    color: #fff;
    font-weight: 700;
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inquiry .container .content-wrap .right-content .inquiry-btn svg {
    width: 16px;
    fill: #fff;
    margin-right: 5px;
  }

  @media (max-width: 640px) {
    .inquiry .container .content-wrap .right-content {
      display: none;
    }
  }
`;

export const PopupTemplate = ({
  title,
  className = "",
  children,
  isHorizen,
  isFilter,
  options,
  onClose,
}: {
  title: string;
  className?: string;
  isHorizen?: boolean;
  children: ReactNode;
  isFilter?: boolean;
  options?: CSSProperties;
  onClose: () => void;
}) => {
  return (
    <Wrap id="wrap" isHorizen={isHorizen} isFilter={isFilter} options={options}>
      <div className={`popup ${className}`}>
        <div className="container">
          <ModalHeader title={title} onClose={onClose} />
          <div className="content-wrap">{children}</div>
        </div>
      </div>
    </Wrap>
  );
};
