import React, { memo, useEffect } from "react";
import ECharts from "echarts-for-react";
import _ from "lodash";
import { getColors, getGrays, rgbaColor } from "utils/colors";

const ReviewLine = ({ data }) => {
  const option = {
    color: getColors().info,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // type: "none"
        // type: 'shadow'
      },
      backgroundColor: getGrays()["100"],
      borderColor: getGrays()["300"],
      textStyle: {
        color: getColors().dark,
      },
      borderWidth: 1,
      transitionDuration: 0,
    },
    animation: false,
    xAxis: {
      // show: false,
      data: ["W-5", "W-4", "W-3", "W-2", "W-1", "W"],
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
    series: [
      {
        type: "line",
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: rgbaColor(getColors().primary, 0.25),
              },
              {
                offset: 1,
                color: rgbaColor(getColors().primary, 0),
              },
            ],
          },
        },
        data: data,
        smooth: true,
        lineStyle: {
          width: 3,
        },
      },
    ],
    grid: {
      // right: "0px",
      // left: "0px",
      bottom: "100px",
      top: "80px",
    },
  };

  return (
    <ECharts
      option={option}
      style={{ minWidth: "200px", width: "100%", height: "290px" }}
      opts={{ renderer: "svg" }}
    />
  );
};

const isEqual = (prevProps, nextProps) => {
  return _.isEqual(prevProps.data, nextProps.data);
};

export default memo(ReviewLine, isEqual);
