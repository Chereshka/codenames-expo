import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import rootReducer from "./rootReducer";
import {
  createMigrate,
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { migrations } from "./migrations";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  version: 1,
  whitelist: ["options", "game"],
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: false,
});

const persistedStore = persistStore(store);

//store for provider
export { store, persistedStore };

//redux types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
