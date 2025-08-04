import { FC } from "react";
import { DefaultIconProps } from "./props";
import { Path, Svg } from "react-native-svg";

const LampIcon: FC<DefaultIconProps> = ({
  size = 24,
  color = "currentColor",
}) => {
  return (
    <Svg
      width={size}
      height={size}
      stroke={color}
      viewBox="0 0 24 24"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
      <Path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
      <Path d="M9.7 17l4.6 0" />
    </Svg>
  );
};

export default LampIcon;
