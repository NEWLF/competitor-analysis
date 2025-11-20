import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { message } from "antd";
import React from "react";
import { FavoritesIcon, PopupOpenIcon } from "../icons";
import { blackAndWhiteTheme } from "./blackAndWhiteTheme";
import { Dashboard } from "./menuData";
import { ssoParams } from "../../remotes/legacy/auth/ssoParams";

export function NavMenu({
  isShow,
  setFalse,
}: {
  isShow: boolean;
  setFalse: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [menus, setMenus] = useState([]);
  const [favoriteMenu, setFavoriteMenu] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [isFavoriteIdx, setIsFavoriteIdx] = useState(-1);
  const [userName, setUserName] = useState("admin");

  const menu = Dashboard;

  useEffect(() => {
    (async () => {
      setMenus(menu[0].children);
      setActiveIdx(menu[0].children.length > 0 ? 0 : -1);
    })();
    setUserName(sessionStorage.getItem("userName") || "admin");
  }, []);

  useEffect(() => {
    for (let i = 0; i < menu[0].children.length; i++) {
      for (let n = 0; n < menu[0].children[i].children.length; n++) {
        for (
          let m = 0;
          m < menu[0].children[i].children[n].children.length;
          m++
        ) {
          if (
            menu[0].children[i].children[n].children[m].isFavorite === "true"
          ) {
            favoriteMenu.push(menu[0].children[i].children[n].children[m]);
          }
        }
      }
    }
  }, []);

  const onClickMenu = (idx) => {
    setActiveIdx(idx);
    setFavorite(false);
  };

  const onClickItem = (item, idx) => {
    // 즐겨찾기 해제하려는 경우
    if (item.isFavorite === "true") {
      setFavoriteMenu((favoriteMenu) =>
        favoriteMenu.filter((favoriteMenu) => favoriteMenu.id !== item.id)
      );
      favoriteMenu.sort((a, b) => {
        return a.id - b.id;
      });
      message.success("즐겨찾기에 해제되었습니다.");
      item.isFavorite = "false";
      setIsFavoriteIdx(-1);
    } else {
      // 즐겨찾기 추가하려는 경우
      favoriteMenu.push(item);
      favoriteMenu.sort((a, b) => {
        return a.id - b.id;
      });
      message.success("즐겨찾기에 추가되었습니다.");
      item.isFavorite = "true";
      setIsFavoriteIdx(idx);
    }
  };

  const handleMenuClick = async (id) => {
    if (id === "931") {
      setFalse();
    }
    if (id === "912") {
      const { P1, P2, P3, P4, P5 } = await ssoParams();
      window.location.href = `http://10.49.8.10:9100?sso=y&p1=${P1}&p2=${P2}&p3=${P3}&p4=${P4}&p5=${P5}&reportId=912`;
    }
  };

  return (
    <Wrap>
      <div className="menu-wrap" style={{ display: isShow ? "flex" : "none" }}>
        <div className="left-menu">
          <div className="user-info">
            <div className="user-img">
              <span>{userName.split("")[0]}</span>
            </div>
            <p className="user-name">{userName}</p>
          </div>
          <div
            className={favorite ? "favorite" : "favorites"}
            onClick={() => setFavorite(true)}
          >
            <a>
              <FavoritesIcon />
              즐겨찾기
            </a>
          </div>
          {/* 좌측메뉴 */}
          <ul>
            {menus.map((menu, idx) => (
              <li
                key={idx}
                className={activeIdx === idx && !favorite ? "active" : ""}
                onClick={() => onClickMenu(idx)}
              >
                <a href="#menuTab1">
                  <span>{menu.idx}</span> <span>{menu.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {favorite ? (
          favoriteMenu.length > 0 ? (
            <React.Fragment>
              <div className="menu-conts">
                <div className="menu-list">
                  <h2>즐겨찾기</h2>
                  {favoriteMenu.map((item, idx) => (
                    <div className="submenu-list">
                      <div className="submenu" key={item.idx}>
                        <ul>
                          <li key={item.idx}>
                            <span className={`ico-favorites on`}>
                              <FavoritesIcon />
                            </span>
                            <a href={"?mode=expanded"}>
                              <span>{item.idx} </span>
                              {item.name}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div className="menu-conts">
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginTop: "35vh",
                  textAlign: "center",
                }}
              >
                즐겨찾기 목록이 없습니다.
              </div>
            </div>
          )
        ) : (
          <div className="menu-conts">
            <div className="menu-list" id="menuTab1">
              {activeIdx === -1 ? (
                <React.Fragment></React.Fragment>
              ) : (
                <React.Fragment>
                  <h2>{menus[activeIdx].name}</h2>
                  <div className="submenu-list">
                    {menus[activeIdx].children.map((submenu, idx) => (
                      <div className="submenu" key={submenu.idx}>
                        <h3>
                          <span>{submenu.idx}</span> {submenu.name}
                        </h3>
                        <ul>
                          {submenu.children.map((item, idx) => (
                            <li key={item.idx}>
                              <span
                                className={`ico-favorites ${
                                  item.isFavorite === "true" ||
                                  item.idx === isFavoriteIdx
                                    ? "on"
                                    : ""
                                }`}
                                onClick={() => onClickItem(item, idx)}
                              >
                                <FavoritesIcon />
                              </span>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => handleMenuClick(item.id)}
                              >
                                <span>{item.idx} </span>
                                {item.name}
                              </span>
                              <a
                                className="ico-open-in-popup"
                                onClick={() =>
                                  window.open(
                                    "?mode=expanded",
                                    "_blank",
                                    "width=1800, height=850, loction=no, status=no"
                                  )
                                }
                              >
                                <PopupOpenIcon />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        )}
      </div>
    </Wrap>
  );
}

const Wrap = styled.section`
  .menu-wrap {
    position: fixed;
    width: 100%;
    top: 50px;
    left: 0;
    bottom: 0;
    display: flex;
    z-index: 99;
    background: #fafafa;
    display: none;
  }

  .menu-wrap .left-menu {
    width: 240px;
    background: ${blackAndWhiteTheme.backgroundColor.menu};
    font-size: 14px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .menu-wrap .left-menu .user-info {
    background: ${blackAndWhiteTheme.backgroundColor.point3};
    padding: 30px 12px;
    border-top: ${"1px solid " + blackAndWhiteTheme.color.point5};
  }

  .menu-wrap .left-menu .user-info .user-img {
    width: 60px;
    height: 60px;
    margin: 0 auto 15px;
    border-radius: 100%;
    background: #fff;
    border: 5px solid #ccc;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu-wrap .left-menu .user-info .user-img span {
    font-size: 35px;
    font-weight: 600;
  }

  .menu-wrap .left-menu .user-info .user-name {
    text-align: center;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
  }

  .menu-wrap .left-menu .favorites a {
    height: 50px;
    line-height: 35px;
    background: transparent;
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid ${blackAndWhiteTheme.color.point5};
  }

  .menu-wrap .left-menu .favorites a svg {
    fill: #ffa500;
    width: 15px;
    margin-right: 5px;
    margin-top: -2px;
  }

  .menu-wrap .left-menu .favorite {
    background: #fff;
    color: #203c4a;
  }

  .menu-wrap .left-menu .favorite a {
    height: 50px;
    line-height: 35px;
    background: ${({ ...props }) =>
      props.theme === blackAndWhiteTheme ? "transparent" : "#ffa500"};
    //color: #ffffff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid ${blackAndWhiteTheme.color.point5};
  }

  .menu-wrap .left-menu .favorite a svg {
    fill: ${({ ...props }) =>
      props.theme === blackAndWhiteTheme ? "#ffa500" : "#fff"};
    width: 15px;
    margin-right: 5px;
    margin-top: -2px;
  }

  .menu-wrap .left-menu ul {
    overflow-y: auto;
    flex: 1;
    -ms-overflow-style: none;
  }

  .menu-wrap .left-menu ul::-webkit-scrollbar {
    display: none;
  }

  .menu-wrap .left-menu ul li {
    color: #fff;
  }

  .menu-wrap .left-menu ul li a {
    display: flex;
    height: 35px;
    line-height: 35px;
  }

  .menu-wrap .left-menu ul li a span:first-child {
    width: 55px;
    text-align: center;
  }

  .menu-wrap .left-menu ul li a span:last-child {
    flex: 1;
    border-bottom: 1px solid #fafafa;
  }

  .menu-wrap .left-menu ul li:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .menu-wrap .left-menu ul li.active {
    background: #fff;
    color: #203c4a;
  }

  .menu-wrap .left-menu ul li.active a {
    font-weight: 700;
  }

  .menu-wrap .left-menu .logout {
    width: 100%;
    position: absolute;
    height: 50px;
    line-height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    bottom: 0;
    font-weight: 700;
    background: ${blackAndWhiteTheme.backgroundColor.point1};
  }

  .menu-wrap .left-menu .logout svg {
    width: 16px;
    fill: none;
    stroke: #fff;
    margin-right: 5px;
  }

  .menu-wrap .left-menu .logout svg path {
    stroke-width: 2px;
  }

  .menu-wrap .left-menu .logout svg path:first-of-type {
    stroke-width: 1px;
  }

  @media (max-width: 640px) {
    .menu-wrap .left-menu {
      width: 50px;
    }

    .menu-wrap .left-menu .user-info {
      display: none;
    }

    .menu-wrap .left-menu .favorites {
      display: none;
    }

    .menu-wrap .left-menu ul li a span:last-child {
      display: none;
    }

    .menu-wrap .left-menu .logout span {
      display: none;
    }
  }

  .menu-wrap .menu-conts {
    flex: 1;
    padding: 30px 50px;
    overflow: auto;
  }

  .menu-wrap .menu-conts .menu-list {
    color: #000;
    display: none;
  }

  .menu-wrap .menu-conts .menu-list:first-child {
    display: block;
  }

  .menu-wrap .menu-conts .menu-list h2 {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .menu-wrap .menu-conts .menu-list .submenu-list .submenu {
    margin-right: 30px;
    display: inline-block;
    vertical-align: top;
    padding-top: 10px;
  }

  .menu-wrap .menu-conts .menu-list .submenu-list .submenu h3 {
    font-size: 15px;
    font-weight: 700;
    height: 35px;
    line-height: 35px;
  }

  .menu-wrap .menu-conts .menu-list .submenu-list .submenu ul li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    white-space: nowrap;
  }

  .menu-wrap
    .menu-conts
    .menu-list
    .submenu-list
    .submenu
    ul
    li
    .ico-favorites {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    justify-content: center;
    margin-right: 5px;
    cursor: pointer;
  }

  .menu-wrap
    .menu-conts
    .menu-list
    .submenu-list
    .submenu
    ul
    li
    .ico-favorites
    svg {
    width: 15px;
    fill: none;
    stroke: rgba(0, 0, 0, 0.5);
  }

  .menu-wrap
    .menu-conts
    .menu-list
    .submenu-list
    .submenu
    ul
    li
    .ico-favorites
    svg
    path {
    stroke-width: 0.5px;
  }

  .menu-wrap
    .menu-conts
    .menu-list
    .submenu-list
    .submenu
    ul
    li
    .ico-favorites.on
    svg {
    fill: #ffa500;
    stroke: #ffa500;
  }

  .menu-wrap .menu-conts .menu-list .submenu-list .submenu ul li a {
    width: 100%;
    cursor: pointer;
  }

  .menu-wrap
    .menu-conts
    .menu-list
    .submenu-list
    .submenu
    ul
    li
    a.ico-open-in-popup {
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
  }

  .menu-wrap
    .menu-conts
    .menu-list
    .submenu-list
    .submenu
    ul
    li
    a.ico-open-in-popup
    svg {
    width: 15px;
  }

  .menu-wrap .menu-conts .menu-list .submenu-list .submenu ul li:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .menu-wrap
    .menu-conts
    .menu-list
    .submenu-list
    .submenu
    ul
    li:hover
    .ico-open-in-popup {
    visibility: visible;
  }

  .menu-wrap .menu-conts .menu-list .submenu-list .submenu ul li .active {
    background-color: rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 640px) {
    .menu-wrap .menu-conts {
      padding: 15px;
    }
  }
`;
