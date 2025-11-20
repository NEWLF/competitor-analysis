import React, { memo } from "react";
import ECharts from "echarts-for-react";
import _ from "lodash";
import { getColors, getGrays } from "utils/colors";

const LineChart = ({ data }) => {
  const option = {
    color: getColors()["lfdep"],
    animation: false,
    tooltip: {
      trigger: "axis",
      backgroundColor: getGrays()["100"],
      borderColor: getGrays()["300"],
      textStyle: {
        color: getColors().dark,
      },
      borderWidth: 1,
      transitionDuration: 0,
    },
    xAxis: {
      show: true,
      data: ["W-3", "W-2", "W-1", "W"],
      type: "category",
      boundaryGap: false,
      axisLabel: {
        color: "#575757",
        formatter: function formatter(value) {
          return value;
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: getGrays()["300"],
        },
      },
    },
    yAxis: {
      show: false,
      type: "value",
      boundaryGap: false,
    },
    dateAxis: {
      groupData: false,
    },
    series: [
      {
        type: "line",
        data: data,
        smooth: true,
        lineStyle: {
          width: 3,
        },
      },
    ],
    grid: {
      top: 40,
      bottom: 20,
      right: 10,
      left: 15,
    },
  };

  return (
    <ECharts
      option={option}
      style={{ height: "120px" }}
      opts={{ renderer: "svg" }}
    />
  );
};

const isEqual = (prevProps, nextProps) => {
  return _.isEqual(prevProps.data, nextProps.data);
};

export default memo(LineChart, isEqual);
