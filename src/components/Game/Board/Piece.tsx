import React, { FC, useState } from "react";
import { useAppSelector } from "@/redux";
import ZeroUses from "./ZeroUses";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type WordpieceProps = {
  label: string;
  usesLeft: number;
  isUsing?: boolean;
  onPress: (text: string) => void;
  isHinted: boolean;
};

const WordPiece: FC<WordpieceProps> = ({
  label,
  usesLeft,
  isUsing,
  onPress,
  isHinted,
}) => {
  const [holded, setHolded] = useState<boolean>(false);
  const animationDisabled = useAppSelector((r) => r.options.disableAnimation);

  // const classes = classNames("wordpiece", {
  //   "no-uses": usesLeft < 1,
  //   active: isUsing,
  //   "wp-shrink": holded && !animationDisabled,
  //   hinted: isHinted,
  // });

  // const labelClasses = classNames("wordpiece__label", {
  //   "no-uses": usesLeft < 1,
  //   active: isUsing,
  // });

  // const usesClasses = classNames("wordpiece__uses", {
  //   "no-uses": usesLeft < 1,
  //   active: isUsing,
  // });

  const handlePress = (label: string) => {
    if (usesLeft < 1) return;
    onPress(label);
    setHolded(true);
  };

  return (
    <Pressable
      style={[
        styles.container,
        isUsing && styles.bgUsing,
        isHinted && styles.hinted,
      ]}
      onPress={() => onPress(label)}
    >
      <Text style={[styles.label, isUsing && styles.labelUsing]}>{label}</Text>
      <Text style={[styles.counter, isUsing && styles.labelUsing]}>
        {usesLeft}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flex: 1,
    maxWidth: "33%",
    height: 60,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4fa",
    borderRadius: 8,
  },
  bgUsing: {
    backgroundColor: "#f6bf2a",
  },
  label: {
    fontFamily: "Montserrat-Black",
    // fontWeight: "900",
    fontSize: 18,
    color: "black",
  },
  labelUsing: {
    color: "white",
  },
  counter: {
    color: "black",
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 9,
    fontFamily: "Montserrat-Regular",
  },
  hinted: {
    backgroundColor: "#f6bf2a",
  },
});

export default WordPiece;
