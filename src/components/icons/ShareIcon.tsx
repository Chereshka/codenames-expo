import { FC } from "react";
import { DefaultIconProps } from "./props";
import { Path, Svg } from "react-native-svg";

const ShareIcon: FC<DefaultIconProps> = ({
  size = 24,
  color = "currentColor",
}) => {
  return (
    <Svg
      width={size}
      height={size}
      stroke={color}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <Path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <Path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <Path d="M8.7 10.7l6.6 -3.4" />
      <Path d="M8.7 13.3l6.6 3.4" />
    </Svg>
  );
};

export default ShareIcon;
