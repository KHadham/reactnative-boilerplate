import * as React from "react";
import Svg, { G, Rect, Ellipse, Defs, ClipPath } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SVGComponent = (props) => {
  let color = "#3B971A"
  if (props?.color !== undefined) {
    color = props.color
  }
  return (
    <Svg
      width={375}
      height={812}
      viewBox="0 0 375 812"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1001_577)">
        <Rect width={375} height={812} fill={color} />
        <Ellipse
          cx={-366}
          cy={355.5}
          rx={741}
          ry={876.5}
          fill="white"
          fillOpacity={0.05}
        />
        <Ellipse
          cx={-258}
          cy={284.5}
          rx={598}
          ry={619.5}
          fill="white"
          fillOpacity={0.05}
        />
        <Ellipse
          cx={-82}
          cy={178.5}
          rx={378}
          ry={377.5}
          fill="white"
          fillOpacity={0.05}
        />
        <Ellipse
          cx={-9}
          cy={127.5}
          rx={268}
          ry={269.5}
          fill="white"
          fillOpacity={0.05}
        />
        <G filter="url(#filter0_d_1001_577)">
          <Ellipse
            cx={79}
            cy={65.5}
            rx={139}
            ry={145.5}
            fill="white"
            fillOpacity={0.05}
            shapeRendering="crispEdges"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_1001_577">
          <Rect width={375} height={812} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
export default SVGComponent;
