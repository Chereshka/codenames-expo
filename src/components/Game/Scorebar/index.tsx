import { useAppSelector } from "@/redux";
import { GameAllWords, GameFoundWords } from "@/redux/Slices/Game";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Percentbar from "./Percentbar";

export default function Scorebar() {
  const words = useAppSelector(GameFoundWords);
  const all = useAppSelector(GameAllWords);

  const max = useMemo(() => all.reduce((a, c) => a + c.length, 0), [all]);

  const currentScore = useMemo(
    () => words.reduce((a, c) => a + c.length, 0),
    [words]
  );

  return (
    <View style={styles.scorebar}>
      <View style={styles.scorebar__top}>
        <Text style={{ fontFamily: "Montserrat-Bold", color: "black" }}>
          Your score: {currentScore}
        </Text>
        <Text style={{ fontFamily: "Montserrat-Bold", color: "black" }}>
          Goal: {max}
        </Text>
      </View>
      <Percentbar current={currentScore} max={max} />
    </View>
  );
}

const styles = StyleSheet.create({
  scorebar: {
    flexDirection: "column",
  },
  scorebar__top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
});
