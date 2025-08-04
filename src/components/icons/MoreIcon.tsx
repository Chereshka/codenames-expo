import { FC } from "react";
import { DefaultIconProps } from "./props";
import { Path, Svg } from "react-native-svg";

const MoreIcon: FC<DefaultIconProps> = ({
  size = 24,
  color = "currentColor",
}) => {
  return (
    <Svg
      width={size}
      height={size}
      stroke={color}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M4 6l16 0" />
      <Path d="M4 12l16 0" />
      <Path d="M4 18l16 0" />
    </Svg>
  );
};

export default MoreIcon;
