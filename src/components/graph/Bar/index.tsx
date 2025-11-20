import ECharts from "echarts-for-react";
import _ from "lodash";
import { CSSProperties, memo } from "react";
import { ScoreBarTooltip } from "../ScoreBar/tooltip";
import { getColors, rgbaColor } from "utils/colors";

const WrapperForEvents = ({
  onClick,
  data,
}: {
  onClick?: (idx: number) => void;
  data: unknown;
}) => {
  const barWrapperStyles: CSSProperties = {
    width: "5%",
    height: "100%",
    cursor: "pointer",
    position: "relative",
  };

  const tooltipBarCircleColor = rgbaColor(getColors()["lfdep"], 1);

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
        padding: "0 8px",
      }}
    >
      <div
        style={barWrapperStyles}
        onClick={() => onClick(5)}
        onMouseOver={() => onMouseOverHandler(5)}
        onMouseLeave={() => onMouseLeaveHandler(5)}
      >
        <ScoreBarTooltip
          score={5}
          data={data[0]}
          color={tooltipBarCircleColor}
        />
      </div>
      <div
        style={barWrapperStyles}
        onClick={() => onClick(4)}
        onMouseOver={() => onMouseOverHandler(4)}
        onMouseLeave={() => onMouseLeaveHandler(4)}
      >
        <ScoreBarTooltip
          score={4}
          data={data[1]}
          color={tooltipBarCircleColor}
        />
      </div>
      <div
        style={barWrapperStyles}
        onClick={() => onClick(3)}
        onMouseOver={() => onMouseOverHandler(3)}
        onMouseLeave={() => onMouseLeaveHandler(3)}
      >
        <ScoreBarTooltip
          score={3}
          data={data[2]}
          color={tooltipBarCircleColor}
        />
      </div>
      <div
        style={barWrapperStyles}
        onClick={() => onClick(2)}
        onMouseOver={() => onMouseOverHandler(2)}
        onMouseLeave={() => onMouseLeaveHandler(2)}
      >
        <ScoreBarTooltip
          score={2}
          data={data[3]}
          color={tooltipBarCircleColor}
        />
      </div>
      <div
        style={barWrapperStyles}
        onClick={() => onClick(1)}
        onMouseOver={() => onMouseOverHandler(1)}
        onMouseLeave={() => onMouseLeaveHandler(1)}
      >
        <ScoreBarTooltip
          score={1}
          data={data[4]}
          color={tooltipBarCircleColor}
        />
      </div>
    </div>
  );
};

const Bar = ({ data, style }) => {
  const option = {
    animation: false,
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
          color: rgbaColor(getColors()["lfdep"], 1),
        },
        data: data,
        z: 10,
        emphasis: {
          itemStyle: {
            color: rgbaColor(getColors()["lfdep"], 1),
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
    <div style={{ position: "relative" }}>
      <ECharts option={option} style={style} />
      <WrapperForEvents data={data} />
    </div>
  );
};

const isEqual = (prevProps, nextProps) => {
  return _.isEqual(prevProps.data, nextProps.data);
};

export default memo(Bar, isEqual);
