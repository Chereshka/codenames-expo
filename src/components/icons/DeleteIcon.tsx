import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";
import { DefaultIconProps } from "./props";

const DeleteIcon: FC<DefaultIconProps> = ({ size = 24, color = 'currentColor' }) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M18 6l-12 12" />
      <Path d="M6 6l12 12" />
    </Svg>
  );
}

export default DeleteIcon;