import { useAppDispatch, useAppSelector } from "@/redux";
import { setBubble } from "@/redux/Slices/Game";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function Scorebubble() {
  const dispatch = useAppDispatch();
  const bubble = useAppSelector((r) => r.game.messageBubble);

  const ref = useRef<any>();

  useEffect(() => {
    const hide = () => {
      dispatch(setBubble(null));
    };
    ref.current = setTimeout(() => {
      hide();
    }, 2000);
    return () => clearTimeout(ref.current);
  }, [bubble, dispatch]);

  return (
    <View style={styles.scorebubble}>
      {bubble && (
        <Text
          style={[
            styles.scorebubble__label,
            bubble.type === "good" && styles.good,
            bubble.type === "bad" && styles.default,
          ]}
        >
          {bubble.message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scorebubble: {
    position: "absolute",
    alignSelf: "center",
    height: 40,
    borderRadius: 30,
  },
  scorebubble__label: {
    color: "white",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
  },
  good: {
    backgroundColor: "#55ac49",
  },
  default: {
    backgroundColor: "gray",
  },
});
