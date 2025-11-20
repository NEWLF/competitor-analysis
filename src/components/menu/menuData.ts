const MenuData = [
  {
    id: "0",
    name: "전사",
    idx: "0.",
    parent: null,
    children: [
      {
        id: "1",
        name: "판매&유통",
        idx: "1",
        parent: "0",
        isFavorite: "false",
        children: [
          {
            id: "11",
            name: "매출점검",
            idx: "1.1",
            parent: "1",
            isFavorite: "false",
            children: [
              {
                id: "111",
                name: "BPU별 월매출 진척현황",
                idx: "1.1.1",
                isFavorite: "false",
                parent: "11",
              },
              {
                id: "112",
                name: "매장분석 - 상세",
                idx: "1.1.2",
                isFavorite: "false",
                parent: "11",
              },
              {
                id: "113",
                name: "매장 KPI",
                idx: "1.1.3",
                isFavorite: "false",
                parent: "11",
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "기획&생산",
        idx: "2",
        parent: "0",
        isFavorite: "false",
        children: [
          {
            id: "21",
            name: "입고/판매/재고 분석",
            idx: "2.1",
            parent: "1",
            isFavorite: "false",
            children: [
              {
                id: "211",
                name: "시즌별 입/판/재",
                idx: "2.1.1",
                isFavorite: "true",
                parent: "21",
              },
              {
                id: "212",
                name: "판매율 구간별 입/판/재",
                idx: "2.1.2",
                isFavorite: "false",
                parent: "21",
              },
            ],
          },
          {
            id: "22",
            name: "제품 기획 분석",
            idx: "2.2",
            isFavorite: "false",
            parent: "1",
            children: [
              {
                id: "221",
                name: "STCL 상세현황",
                idx: "2.2.1",
                isFavorite: "false",
                parent: "22",
              },
              {
                id: "222",
                name: "BEST 10/20/30 스타일",
                idx: "2.2.2",
                isFavorite: "false",
                parent: "22",
              },
              {
                id: "223",
                name: "sales map report",
                idx: "2.2.3",
                isFavorite: "false",
                parent: "22",
              },
            ],
          },
          {
            id: "23",
            name: "생산/일정관리",
            idx: "2.3",
            isFavorite: "false",
            parent: "1",
            children: [
              {
                id: "231",
                name: "PO 기준 입고 진척",
                idx: "2.3.1",
                isFavorite: "false",
                parent: "23",
              },
            ],
          },
        ],
      },
    ],
  },
];

const Dashboard = [
  {
    id: "0",
    name: "전사",
    idx: "0.",
    parent: null,
    children: [
      {
        id: "9",
        name: "Social&마케팅",
        idx: "9",
        parent: "0",
        isFavorite: "false",
        children: [
          {
            id: "93",
            name: "경쟁사 상품분석",
            idx: "9.1",
            parent: "9",
            isFavorite: "false",
            children: [
              {
                id: "912",
                name: "경쟁사 상품 구성 현황",
                idx: "9.1.2",
                isFavorite: "false",
                parent: "93",
              },
            ],
          },
        ],
      },
    ],
  },
];

const AdminDashboard = [
  {
    id: "0",
    name: "전사",
    idx: "0.",
    parent: null,
    children: [
      {
        id: "9",
        name: "Social&마케팅",
        idx: "9",
        parent: "0",
        isFavorite: "false",
        children: [
          {
            id: "93",
            name: "경쟁사 상품분석",
            idx: "9.1",
            parent: "9",
            isFavorite: "false",
            children: [
              {
                id: "912",
                name: "경쟁사 상품 구성 현황",
                idx: "9.1.2",
                isFavorite: "false",
                parent: "93",
              },
            ],
          },
        ],
      },
    ],
  },
];

export { MenuData, Dashboard, AdminDashboard };
