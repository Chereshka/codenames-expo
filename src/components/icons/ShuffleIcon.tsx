import { FC } from "react";
import { DefaultIconProps } from "./props";
import { Path, Svg } from "react-native-svg";

const ShuffleIcon: FC<DefaultIconProps> = ({
  size = 24,
  color = "currentColor",
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M18 4l3 3l-3 3" />
      <Path d="M18 20l3 -3l-3 -3" />
      <Path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5" />
      <Path d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3" />
    </Svg>
  );
};

export default ShuffleIcon;
