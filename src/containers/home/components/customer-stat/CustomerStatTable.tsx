import { colors } from "@boxfoxs/bds-common";
import { Spacing, Text } from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import { Table } from "antd";
import { CustomerData } from "remotes/legacy";
import React from "react";

const COLUMNS = [
  { title: "성별", dataIndex: "SEX_GB" },
  { title: "Total", dataIndex: "TOT_AGE_CNT" },
  { title: "~20대", dataIndex: "A20_MM" },
  { title: "30~34", dataIndex: "A30_MM" },
  { title: "35~39", dataIndex: "A35_MM" },
  { title: "40~44", dataIndex: "A40_MM" },
  { title: "45~49", dataIndex: "A45_MM" },
  { title: "50~54", dataIndex: "A50_MM" },
  { title: "55~59", dataIndex: "A55_MM" },
  { title: "60~64", dataIndex: "A60_MM" },
  { title: "65~69", dataIndex: "A65_MM" },
  { title: "70대~", dataIndex: "A70_MM" },
];

export function CustomerStatTable({
  loading,
  data,
}: {
  loading?: boolean;
  data: CustomerData[];
}) {
  const source = React.useMemo(() => {
    return data?.map(row =>
      Object.entries(row).reduce((newRow, [key, value]) => {
        newRow[key] = typeof value === 'number' ? value.toLocaleString() : value;
        return newRow;
      }, {}))
  }, [data]);

  return (
    <Container>
      <div>
        <Text size="xs" color={colors.gray900} weight="bold">
          ※ 상품평 작성 고객 정보 (LFMall, 헤지스닷컴)
        </Text>
      </div>
      <Spacing height={12} />
      <StyledTable
        size="small"
        dataSource={source}
        columns={COLUMNS}
        loading={loading}
        pagination={false}
      />
    </Container>
  );
}

const Container = styled.div`
  overflow-x: scroll;
  padding: 0 8px;
`;

const StyledTable = styled(Table)`
  .ant-table {
    font-size: 16px !important;
    font-family: "Nanum Gothic", sans-serif !important;

    .ant-table-cell {
      padding: 0 !important;
      text-align: center !important;
      height: 32px;

      &::before {
        position: absolute;
        top: 50%;
        inset-inline-end: 0;
        width: 1px;
        height: 32px;
        background-color: #d3d3d3;
        transform: translateY(-50%);
        transition: background-color 0.2s;
        content: "";
      }
    }

    thead {
      tr:first-child > *:first-child {
        border-start-start-radius: 0 !important;
      }
      tr:first-child > *:last-child {
        border-start-end-radius: 0 !important;
      }
      tr {
        th {
          &.ant-table-cell {
            color: white;
            background-color: #5e5c5c;
            font-weight: bold;
          }
          &:nth-of-type(1) {
            &::before {
              height: 0 !important;
              width: 0 !important;
            }
          }
          &:nth-of-type(2) {
            border-left: solid 1px white;
            border-right: solid 1px white;
            &::before {
              height: 0 !important;
              width: 0 !important;
            }
          }
        }
      }
    }
    
    tbody {
      tr {
        &:nth-of-type(1) {
          td.ant-table-cell {
            background-color: #ededed;
            font-weight: bold;
          }
        }
        &:nth-of-type(2) {
          td:nth-of-type(2) {
            background-color: #ededed;
            font-weight: bold;
          }
        }
        &:nth-of-type(3) {
          td:nth-of-type(2) {
            background-color: #ededed;
            font-weight: bold;
          }
        }
        
        td:first-of-type,
        td:last-of-type {
          border-left: solid 1px #ededed;
          &::before {
            width: 0;
            height: 0;
          }
        }
        
        td:nth-of-type(2) {
          border-left: solid 1px black;
          border-right: solid 1px black;
          &::before {
            width: 0 !important;
            height: 0 !important;
          }
        }
      }
    }
  }
`;
