const NavigationLight = {
  dark: false,
  colors: {
    primary: "rgb(0, 122, 255)",
    background: "rgb(255, 255, 255)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

const NavigationDark = {
  dark: true,
  colors: {
    primary: "white",
    // background: '#000d20',
    // card: '#000d20',
    background: "#1C1C1E",
    card: "#1C1C1E",
    text: "rgb(229, 229, 231)",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
};

export { NavigationDark, NavigationLight };
