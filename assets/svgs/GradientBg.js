import { widthByScreen } from "@utils/dimensions";
import * as React from "react";
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";
const SVGComponent = (props) => {
  let color = "#E0F8D8"
  if (props?.color !== undefined) {
    color = props.color
  }
  return (
    <Svg
      width={widthByScreen(100)}
      height={185}
      viewBox={`0 0 ${widthByScreen(100)} 185`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={widthByScreen(100)} height={185} fill="url(#paint0_linear_263_2161)" />
      <Defs>
        <LinearGradient
          id="paint0_linear_263_2161"
          x1={187.5}
          y1={-3.02051e-8}
          x2={187}
          y2={333}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color} />
          <Stop offset={0.561463} stopColor={color} stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
};
export default SVGComponent;
