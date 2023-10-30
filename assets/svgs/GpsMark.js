import * as React from "react";
import Svg, { Circle } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    fill="#000000"
    width="30px"
    height="30px"
    viewBox="0 0 24 24"
    id="gps"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon line-color"
    {...props}
  >
    <Circle
      id="secondary"
      cx={12}
      cy={12}
      r={3}
      style={{
        fill: "none",
        stroke: "rgb(44, 169, 188)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <Circle
      id="primary"
      cx={12}
      cy={12}
      r={9}
      style={{
        fill: "none",
        stroke: "rgb(0, 0, 0)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </Svg>
);
export default SVGComponent;
