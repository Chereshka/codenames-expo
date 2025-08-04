import { FC } from "react";
import { DefaultIconProps } from "./props";
import { Path, Svg } from "react-native-svg";

interface Props extends DefaultIconProps {
  rotate?: boolean;
}

const ArrowDown: FC<Props> = ({
  size = 24,
  color = "currentColor",
  rotate = false,
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
      rotation={rotate ? 180 : 0}
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M12 5l0 14" />
      <Path d="M18 13l-6 6" />
      <Path d="M6 13l6 6" />
    </Svg>
  );
};

export default ArrowDown;
