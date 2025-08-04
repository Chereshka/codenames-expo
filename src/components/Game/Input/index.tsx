import React, { FC } from "react";
import { useAppSelector } from "@/redux";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Scorebubble from "../Scorebubble";

type Props = {
  good: any;
  bad: any;
  trayVisible: boolean;
};

const Input: FC<Props> = ({ good, bad, trayVisible }) => {
  const pieces = useAppSelector((r) => r.game.input);

  const input = useAppSelector((r) => r.game.input);

  return (
    <View style={styles.container}>
      <Scorebubble />
      <View style={styles.container2}>
        {pieces.map((e, i) => {
          return (
            <Text style={styles.text} key={i}>
              {e}
            </Text>
          );
        })}
        {trayVisible && input.length < 4 ? (
          <View style={styles.cursor} />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    position: "relative",
  },
  container2: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 24,
    fontFamily: "Montserrat-Black",
    color: "black",
  },
  cursor: {
    // border-bottom: 4px solid #f6bf2a;
    margin: 2,
    width: 25,
    borderBottomWidth: 4,
    borderBottomColor: "#f6bf2a",
  },
});

export default Input;

{
  /* <div className="relative">
<Scorebubble />
<div ref={bad} className="gameinput">
  <ul ref={good} className="input_container">
    {pieces.map((e, i) => {
      return (
        <li className="gameinput__element" key={i}>
          {e}
        </li>
      );
    })}
  </ul>
  {trayVisible && input.length < 4 ? <div className="cursor" /> : null}
</div>
</div> */
}
