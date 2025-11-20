import { useReviewModal } from "@/containers/home/components/review-list";
import ECharts from "echarts-for-react";
import _ from "lodash";
import React, { CSSProperties, memo } from "react";
import { ScoreBarTooltip } from "./tooltip";
import { getGrays, getColors, rgbaColor } from "utils/colors";

const WrapperForEvents = ({ onClick, data }) => {
  const barWrapperStyles: CSSProperties = {
    width: "5%",
    height: "100%",
    cursor: "pointer",
    position: "relative",
  };

  const onMouseOverHandler = (score) => {
    const targetTooltip = document.getElementById(`tooltip${score}`);
    targetTooltip.style.display = "block";
  };

  const onMouseLeaveHandler = (score) => {
    const targetTooltip = document.getElementById(`tooltip${score}`);
    targetTooltip.style.display = "none";
  };

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        justifyContent: "space-between",
        zIndex: "2",
        padding: "16px 8px 0px 8px",
      }}
    >
      <div
        style={barWrapperStyles}
        onClick={() => onClick(5)}
        onMouseOver={() => onMouseOverHandler(5)}
        onMouseLeave={() => onMouseLeaveHandler(5)}
      >
        <ScoreBarTooltip score={5} data={data[0]} />
      </div>
      <div
        style={barWrapperStyles}
        onClick={() => onClick(4)}
        onMouseOver={() => onMouseOverHandler(4)}
        onMouseLeave={() => onMouseLeaveHandler(4)}
      >
        <ScoreBarTooltip score={4} data={data[1]} />
      </div>
      <div
        style={barWrapperStyles}
        onClick={() => onClick(3)}
        onMouseOver={() => onMouseOverHandler(3)}
        onMouseLeave={() => onMouseLeaveHandler(3)}
      >
        <ScoreBarTooltip score={3} data={data[2]} />
      </div>
      <div
        style={barWrapperStyles}
        onClick={() => onClick(2)}
        onMouseOver={() => onMouseOverHandler(2)}
        onMouseLeave={() => onMouseLeaveHandler(2)}
      >
        <ScoreBarTooltip score={2} data={data[3]} />
      </div>
      <div
        style={barWrapperStyles}
        onClick={() => onClick(1)}
        onMouseOver={() => onMouseOverHandler(1)}
        onMouseLeave={() => onMouseLeaveHandler(1)}
      >
        <ScoreBarTooltip score={1} data={data[4]} />
      </div>
    </div>
  );
};

const ScoreBar = (props) => {
  const open = useReviewModal();

  const onClickHandler = (score) => {
    open({ SCORE: score });
  };

  const onEvents = {
    click: onClickHandler,
  };

  const option = {
    animation: false,
    tooltip: {
      trigger: "axis",
      padding: [7, 10],
      backgroundColor: getGrays()["100"],
      borderColor: getGrays()["300"],
      textStyle: {
        color: getColors().dark,
      },
      borderWidth: 1,
      transitionDuration: 0,
    },
    xAxis: {
      type: "category",
      data: ["5", "4", "3", "2", "1"],
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisPointer: {
        type: "none",
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisPointer: {
        type: "none",
      },
    },
    series: [
      {
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          borderRadius: 10,
        },
        barWidth: "8px",
        itemStyle: {
          borderRadius: 10,
          color: rgbaColor(getColors().info, 1),
        },
        data: props.data,
        z: 10,
        emphasis: {
          itemStyle: {
            color: rgbaColor(getColors().info, 1),
          },
        },
      },
    ],
    grid: {
      right: 10,
      left: 10,
      top: 0,
      bottom: 0,
    },
  };

  return (
    <React.Fragment>
      <ECharts
        option={option}
        style={{ width: "100%", height: "100%" }}
        onEvents={onEvents}
      />
      <WrapperForEvents data={props.data} onClick={onClickHandler} />
    </React.Fragment>
  );
};

const isEqual = (prevProps, nextProps) => {
  return _.isEqual(prevProps.data, nextProps.data);
};

export default memo(ScoreBar, isEqual);
