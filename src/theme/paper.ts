import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

const AppLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    statusbar: "#f7f7f7",
  },
};

const AppDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    statusbar: "#000000",
  },
};

export { AppDarkTheme, AppLightTheme };
