import { useAppDispatch, useAppSelector } from "@/redux";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import {
  resetInput,
  setCurrentStreak,
  setIsSubmitting,
} from "@/redux/Slices/Game";
import { wasItTodayUtil, wasItYesterdayUtil } from "@/utils";
import { NavigationDark, NavigationLight } from "@/theme/navigation";
import { AppDarkTheme, AppLightTheme } from "@/theme/paper";
import { Audio } from "expo-av";
import { player } from "@/app/_layout";

export default function PostHydration() {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((r) => r.options.darkMode);

  const lastWin = useAppSelector((r) => r.game.lastDailyWin);
  const colorScheme = useColorScheme();
  const [localeLoaded, setLocaleLoaded] = useState<boolean>(false);
  const [soundsLoaded, setSoundsLoaded] = useState<boolean>(false);

  const [loaded] = useFonts({
    "Montserrat-Regular": require("@/../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("@/../assets/fonts/Montserrat/Montserrat-Medium.ttf"),
    "Montserrat-Semibold": require("@/../assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("@/../assets/fonts/Montserrat/Montserrat-Bold.ttf"),
    "Montserrat-Black": require("@/../assets/fonts/Montserrat/Montserrat-Black.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // useEffect(() => {
  //   const configureStore = () => {
  //     if (Platform.OS === "ios") {
  //       Purchases.configure({ apiKey: process.env.STORE_IOS_API || "" });
  //     } else if (Platform.OS === "android") {
  //       Purchases.configure({ apiKey: process.env.STORE_ANDROID_API || "" });
  //     }
  //   };
  //   configureStore();
  // }, []);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
    const load = async () => {
      await player.init();
      setSoundsLoaded(true);
    };
    load();
  }, []);

  useEffect(() => {
    const checkDailyStreak = () => {
      if (lastWin) {
        const isYesterday = wasItYesterdayUtil(lastWin);
        const isToday = wasItTodayUtil(lastWin);
        if (!isYesterday && !isToday) {
          dispatch(setCurrentStreak(0));
        }
      }
    };

    const Reset = () => {
      dispatch(setIsSubmitting(false));
      dispatch(resetInput());
    };

    checkDailyStreak();
    Reset();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <React.Fragment>
      <ThemeProvider value={false ? NavigationDark : NavigationLight}>
        <PaperProvider theme={isDark ? AppDarkTheme : AppLightTheme}>
          <Slot />
        </PaperProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
