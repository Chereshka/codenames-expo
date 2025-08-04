import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

type SupportedLocale = "en";

export interface OptionsState {
  darkMode: boolean;
  currentLocale: SupportedLocale;
  currentLocalization?: object;
  disableAnimation: boolean;
  disableSound: boolean;
}

const initialState: OptionsState = {
  darkMode: false,
  currentLocale: "en",
  currentLocalization: undefined,
  disableAnimation: false,
  disableSound: false,
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setCurrentLocale: (state, action: PayloadAction<SupportedLocale>) => {
      state.currentLocale = action.payload;
    },
    setCurrentLocalization: (state, action: PayloadAction<object>) => {
      state.currentLocalization = action.payload;
    },
    setDisableAnimations: (state, action: PayloadAction<boolean>) => {
      state.disableAnimation = action.payload;
    },
    setDisableSounds: (state, action: PayloadAction<boolean>) => {
      state.disableSound = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDisableSounds,
  setDarkMode,
  setCurrentLocale,
  setCurrentLocalization,
  setDisableAnimations,
} = optionsSlice.actions;

export default optionsSlice.reducer;

export const darkMode = (state: RootState) => state.options.darkMode;
