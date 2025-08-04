import React from "react";
import { StyleSheet, Text } from "react-native";

export default function Logo() {
  return <Text style={styles.caption}>Archive</Text>;
}

const styles = StyleSheet.create({
  caption: {
    fontSize: 18,
    backgroundColor: "#eae0cb",
    paddingHorizontal: 9,
    borderRadius: 8,
    alignSelf: "flex-start",
    fontFamily: "Montserrat-Bold",
    // fontWeight: "700"
  },
});
