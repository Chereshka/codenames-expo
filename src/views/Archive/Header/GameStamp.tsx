import { useAppSelector } from "@/redux";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function GameStamp() {
  const id = useAppSelector((r) => r.game.currentGameId);
  const isLoading = useAppSelector((r) => r.game.puzzleLoading);
  return (
    <View style={{ marginLeft: 4 }}>
      <Text>{isLoading ? "" : `#${id}`}</Text>
    </View>
  );
}
