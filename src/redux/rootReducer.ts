import { combineReducers } from "@reduxjs/toolkit";
import optionsReducer from "@/redux/Slices/Options";
import gameReducer from "@/redux/Slices/Game";
import navigationReducer from "@/redux/Slices/Navigation";

const rootReducer = combineReducers({
  options: optionsReducer,
  game: gameReducer,
  navigation: navigationReducer,
});

export default rootReducer;
