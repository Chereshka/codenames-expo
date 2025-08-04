import Help from "@/views/Modals/Help";
import Rankings from "@/views/Modals/Rankings";
import Settings from "@/views/Modals/Settings";
import Statistics from "@/views/Modals/Statistics";
import Yesterday from "@/views/Modals/Yesterday";
import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <React.Fragment>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarColor: "#faf7f1",
          statusBarStyle: "dark",
        }}
      >
        <Stack.Screen name="index" options={{}} />
        <Stack.Screen name="archive/index" options={{}} />
        <Stack.Screen name="game/[id]" options={{}} />
      </Stack>
      <Help />
      <Statistics />
      <Settings />
      <Yesterday />
      <Rankings />
    </React.Fragment>
  );
}
