import { persistedStore, store } from "@/redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from "expo-splash-screen";
import PostHydration from "@/components/wrappers/PostHydration";
import "react-native-reanimated";
import { Sounds } from "@/utils/Player";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Entry() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <PostHydration />
      </PersistGate>
    </Provider>
  );
}

const player = new Sounds();

export { player };
