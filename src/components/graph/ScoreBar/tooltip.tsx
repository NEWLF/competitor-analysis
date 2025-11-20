import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import { rgbaColor, getColors } from "utils/colors";
import { numberWithCommas } from "utils/number";

const Wrap = styled.div`
  display: none;
  top: -100%;
  left: 50%;
  position: absolute;
  border-color: rgb(216, 226, 239);
  border-style: solid;
  white-space: nowrap;
  z-index: 9999999;
  box-shadow: rgb(0 0 0 / 20%) 1px 2px 10px;
  background-color: rgb(249, 250, 253);
  border-width: 1px;
  border-radius: 4px;
  color: rgb(11, 23, 39);
  font: 14px / 21px "Microsoft YaHei";
  padding: 3px 4px;
  transform: translate(-50%, 0);
`;

export const ScoreBarTooltip = ({
  score,
  data,
  color = rgbaColor(getColors().info, 1),
}) => {
  return (
    <Wrap id={`tooltip${score}`}>
      <div style={{ transform: "scale(0.7)" }}>
        <h5>{score}</h5>
        <FontAwesomeIcon
          icon={faCircle}
          style={{
            width: "8px",
            color: "#27bcfd",
          }}
        />
        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
          {" "}
          {numberWithCommas(data)}
        </span>
      </div>
    </Wrap>
  );
};
