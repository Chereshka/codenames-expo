import { FC } from "react";
import { DefaultIconProps } from "./props";
import { Path, Svg } from "react-native-svg";

const CalendarIcon: FC<DefaultIconProps> = ({
  size = 24,
  color = "currentColor",
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"></Path>
      <Path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3"></Path>
      <Path d="M16 3v4"></Path>
      <Path d="M8 3v4"></Path>
      <Path d="M4 11h12"></Path>
      <Path d="M20 14l2 2h-3"></Path>
      <Path d="M20 18l2 -2"></Path>
      <Path d="M19 16a3 3 0 1 0 2 5.236"></Path>
    </Svg>
  );
};

export default CalendarIcon;
