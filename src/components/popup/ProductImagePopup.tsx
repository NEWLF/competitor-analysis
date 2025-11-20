import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";

import { Modal } from "antd";
import { withProps } from "@/components/hocs";
import { ImgIcon, MagnifyingGlass } from "@/components/icons";
import { blackAndWhiteTheme } from "@/components/menu/blackAndWhiteTheme";
import { fetchStclDesc } from "remotes/legacy";
import { numberWithCommas, roundWithDecimal } from "utils/number";
import { PopupTemplate } from "./PopupTemplate";
import { Menu } from "@/containers/home/components/filter/modal/menu";

const Wrap = styled.div`
  height: 70vh;

  .inquiry.productimg-wrap .content-wrap .search-STCL {
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #d2d2d2;
    box-sizing: border-box;
  }
  .inquiry.productimg-wrap .content-wrap .search-STCL input[type="text"] {
    outline: none;
    border: none;
    height: 100%;
    padding: 0 2px;
    width: calc(100% - 40px);
  }
  .inquiry.productimg-wrap
    .content-wrap
    .search-STCL
    input[type="text"]::-webkit-input-placeholder {
    font-size: 1rem;
    color: #bbb;
    opacity: 1;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .search-STCL
    input[type="text"]::-moz-placeholder {
    font-size: 1rem;
    color: #bbb;
    opacity: 1;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .search-STCL
    input[type="text"]:-ms-input-placeholder {
    font-size: 1rem;
    color: #bbb;
    opacity: 1;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .search-STCL
    input[type="text"]:-moz-placeholder {
    font-size: 1rem;
    color: #bbb;
    opacity: 1;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .search-STCL
    input[type="text"]:placeholder {
    font-size: 1rem;
    color: #bbb;
    opacity: 1;
  }
  .inquiry.productimg-wrap .content-wrap .search-STCL button {
    width: 40px;
    height: 100%;
  }
  .inquiry.productimg-wrap .content-wrap .search-STCL button svg {
    width: 16px;
  }
  .inquiry.productimg-wrap .content-wrap .main-content {
    width: 85%;
    border: 0;
  }
  .inquiry.productimg-wrap .content-wrap .main-content .STCL-name {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #d2d2d2;
  }
  .inquiry.productimg-wrap .content-wrap .main-content .STCL-name svg {
    width: 17px;
  }
  .inquiry.productimg-wrap .content-wrap .main-content .tab-wrap {
    padding: 0;
    overflow: hidden;
    height: 100%;
    display: flex;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .filter-wrap.product-conts {
    display: none;
    width: 100%;
    flex-wrap: nowrap;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .filter-wrap.product-conts:first-child {
    display: flex;
  }
  .inquiry.productimg-wrap .content-wrap .main-content .tab-wrap .image-wrap {
    flex: 1;
    text-align: center;
    height: 100%;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .image-wrap
    .projuct-img {
    height: calc(100% - 44px);
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .image-wrap
    .projuct-img
    img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .product-detail {
    width: 220px;
    box-sizing: border-box;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .product-detail
    .status-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    box-sizing: border-box;
    padding-right: 10px;
    border-bottom: 1px solid #d2d2d2;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .product-detail
    .status-btn
    button {
    font-size: 12px;
    width: 100%;
    color: #fff;
    background-color: #000;
    text-align: center;
    padding: 10px 0;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .product-detail
    .table-wrap {
    padding-right: 5px;
    overflow: auto;
    height: 100%;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .product-detail
    .table-wrap::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .product-detail
    .table-wrap::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 10px;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .product-detail
    .table-wrap
    table {
    width: 100%;
    max-width: 210px;
    border: 1px solid #203c4a;
    font-size: 12px;
    margin-bottom: 45px;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .product-detail
    .table-wrap
    table
    caption {
    position: absolute !important;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .product-detail
    .table-wrap
    table
    tr {
    height: 27px;
    line-height: 27px;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .product-detail
    .table-wrap
    table
    tr
    th {
    text-align: left;
    padding: 0 10px;
    color: #fff;
    border-bottom: 1px solid #465c67;
    background: ${blackAndWhiteTheme.backgroundColor.point3};
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .product-detail
    .table-wrap
    table
    tr
    th.point-color {
    background: #e60012;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .product-detail
    .table-wrap
    table
    tr
    td {
    text-align: center;
    border-bottom: 1px solid #eee;
  }
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .product-detail
    .table-wrap
    table
    tr:last-child
    th,
  .inquiry.productimg-wrap
    .content-wrap
    .main-content
    .tab-wrap
    .product-detail
    .table-wrap
    table
    tr:last-child
    td {
    border-bottom: 0;
  }
`;

export const ProductImgPopup = ({ onClose, value = "", data = [] }) => {
  const [stcl, setStcl] = useState(value);
  const [stcls, setStcls] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<string>();
  const activeIdx = stcls?.findIndex((i) => i.STCL === selected) || -1;

  const items = useMemo(() => stcls.map((stcl) => stcl.STCL), [stcls]);

  useEffect(() => {
    data.length <= 0
      ? fetchStcls()
      : setSelected(data.length > 0 ? data[0] : undefined);
  }, []);

  const fetchStcls = async () => {
    setIsLoading(true);

    const data = await fetchStclDesc(stcl);
    data && setStcls(data);
    setSelected(data.length > 0 ? data[0] : undefined);

    setIsLoading(false);
  };

  return (
    <StyledModal>
      <Wrap>
        <PopupTemplate
          className="inquiry productimg-wrap"
          title="상품 이미지 조회"
          isHorizen
          isFilter
          onClose={onClose}
        >
          <div className="left-content">
            <div className="search-STCL">
              <input
                type="text"
                placeholder="ST OR STCL"
                value={stcl}
                onChange={(e) => setStcl(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && fetchStcls()}
              />
              <button type="submit" onClick={fetchStcls}>
                <MagnifyingGlass />
              </button>
            </div>
            <Menu items={items} value={selected} onChange={setSelected} />
          </div>
          <div className="main-content">
            <div className="tab-wrap">
              <div className="filter-wrap product-conts" id="tab1">
                <div className="image-wrap">
                  <h2 className="content-title STCL-name">
                    <ImgIcon /> {activeIdx > -1 && stcls[activeIdx].STCL}
                  </h2>
                  <div className="projuct-img">
                    {!isLoading && (
                      <img
                        src={activeIdx > -1 ? stcls[activeIdx].URL : ""}
                        alt={activeIdx > -1 ? stcls[activeIdx].STCL : ""}
                      />
                    )}
                  </div>
                </div>
                <div className="product-detail">
                  <div className="status-btn">
                    <button
                      type="button"
                      // onClick={() =>
                      //   onAddPopupHandler(
                      //     <DetailStatusPopup stcl={stcl}></DetailStatusPopup>
                      //   )
                      // }
                    >
                      2.2.1 STCL 상세현황에서 보기
                    </button>
                  </div>
                  <div className="table-wrap">
                    <table>
                      <caption>상품 상세현황</caption>
                      <colgroup>
                        <col width="50%" />
                        <col width="50%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>이월여부</th>
                          <td>
                            {activeIdx > -1 ? stcls[activeIdx].NORMAL_NAME : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>이월조치일</th>
                          <td>
                            {activeIdx > -1 ? stcls[activeIdx].JO_DAY : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>제품년도</th>
                          <td>
                            {activeIdx > -1 ? stcls[activeIdx].PROD_YYYY : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>시즌</th>
                          <td>
                            {activeIdx > -1 ? stcls[activeIdx].SEASON : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>품목</th>
                          <td>
                            {activeIdx > -1 ? stcls[activeIdx].ITEM_NAME : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>기획랭킹</th>
                          <td>
                            {activeIdx > -1 ? stcls[activeIdx].PLAN_RANK : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>생산랭킹</th>
                          <td>
                            {activeIdx > -1 ? stcls[activeIdx].MAKE_RANK : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>판매랭킹</th>
                          <td>
                            {activeIdx > -1 ? stcls[activeIdx].SALE_RANK : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>매장출시일</th>
                          <td>
                            {activeIdx > -1 ? stcls[activeIdx].LAUNCH_DAY : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>판기시작일</th>
                          <td>
                            {activeIdx > -1
                              ? stcls[activeIdx].SALE_LAUNCH_DATE
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>판기종료일</th>
                          <td>
                            {activeIdx > -1
                              ? stcls[activeIdx].SALE_END_DATE
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>소비자가</th>
                          <td>
                            {activeIdx > -1
                              ? numberWithCommas(stcls[activeIdx].AMT_CS_CONF)
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>제조원가</th>
                          <td>
                            {activeIdx > -1
                              ? numberWithCommas(stcls[activeIdx].WONGA)
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>제조원가율</th>
                          <td>
                            {activeIdx > -1
                              ? roundWithDecimal(stcls[activeIdx].WONGA_RATE) +
                                "%"
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th className="point-color">판매율</th>
                          <td>
                            {activeIdx > -1
                              ? roundWithDecimal(stcls[activeIdx].PM) + "%"
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th className="point-color">판가율</th>
                          <td>
                            {activeIdx > -1
                              ? roundWithDecimal(stcls[activeIdx].PG) + "%"
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>가득율</th>
                          <td>
                            {activeIdx > -1
                              ? roundWithDecimal(stcls[activeIdx].GD) + "%"
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>온라인전용구분</th>
                          <td>
                            {activeIdx > -1 ? stcls[activeIdx].ONTF_FLAG : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>발주</th>
                          <td>
                            {activeIdx > -1
                              ? numberWithCommas(stcls[activeIdx].BAL_CNT)
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>입고</th>
                          <td>
                            {activeIdx > -1
                              ? numberWithCommas(stcls[activeIdx].GR_CNT)
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>판매</th>
                          <td>
                            {activeIdx > -1
                              ? numberWithCommas(stcls[activeIdx].CS_CNT)
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>재고</th>
                          <td>
                            {activeIdx > -1
                              ? numberWithCommas(stcls[activeIdx].STOCK_CNT)
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>미입고</th>
                          <td>
                            {activeIdx > -1
                              ? numberWithCommas(stcls[activeIdx].CNT_N_GR)
                              : ""}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopupTemplate>
      </Wrap>
    </StyledModal>
  );
};

const StyledModal = withProps(Modal, {
  open: true,
  footer: false,
  closeIcon: false,
  styles: { content: { padding: "8px" }, wrapper: {} },
  width: "90vw",
});
