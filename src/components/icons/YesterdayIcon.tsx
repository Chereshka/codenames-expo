import React, { FC } from "react";
import { Path, Svg } from "react-native-svg";
import { DefaultIconProps } from "./props";

const YesterdayIcon: FC<DefaultIconProps> = ({
  size,
  color = "currentColor",
}) => {
  return (
    <Svg fill={color} height={size} width={size} viewBox="0 0 24 24">
      <Path
        clipRule="evenodd"
        d="m7 2c.55228 0 1 .44772 1 1v1h8v-1c0-.55228.4477-1 1-1s1 .44772 1 1v1h1c1.6569 0 3 1.34315 3 3v7c0 .5523-.4477 1-1 1s-1-.4477-1-1v-4h-16v9c0 .5523.44772 1 1 1h5c.5523 0 1 .4477 1 1s-.4477 1-1 1h-5c-1.65685 0-3-1.3431-3-3v-12c0-1.65685 1.34315-3 3-3h1v-1c0-.55228.44772-1 1-1zm-2 4c-.55228 0-1 .44772-1 1v1h16v-1c0-.55228-.4477-1-1-1z"
        fillRule="evenodd"
      />
      <Path d="m16.7071 17.7071c.3905-.3905.3905-1.0237 0-1.4142s-1.0237-.3905-1.4142 0l-2 2c-.3905.3905-.3905 1.0237 0 1.4142l2 2c.3905.3905 1.0237.3905 1.4142 0s.3905-1.0237 0-1.4142l-1.2929-1.2929z" />
      <Path d="m21.7071 16.2929c.3905.3905.3905 1.0237 0 1.4142l-1.2929 1.2929 1.2929 1.2929c.3905.3905.3905 1.0237 0 1.4142s-1.0237.3905-1.4142 0l-2-2c-.3905-.3905-.3905-1.0237 0-1.4142l2-2c.3905-.3905 1.0237-.3905 1.4142 0z" />
    </Svg>
  );
};
export default YesterdayIcon;
