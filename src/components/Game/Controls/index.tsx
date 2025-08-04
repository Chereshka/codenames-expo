import DeleteIcon from "@/components/icons/DeleteIcon";
import LampIcon from "@/components/icons/LampIcon";
import ShareIcon from "@/components/icons/ShareIcon";
import ShuffleIcon from "@/components/icons/ShuffleIcon";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  GameIsOver,
  HintsLeft,
  popInput,
  setBubble,
  shufflePieces,
  submit,
} from "@/redux/Slices/Game";
import { setOpenModal } from "@/redux/Slices/Navigation";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";

type Props = {
  fail: () => void;
  success: () => void;
  cancel: () => void;
  handleHint: () => void;
};

const Controls: FC<Props> = ({ fail, success, cancel, handleHint }) => {
  const dispatch = useAppDispatch();
  const isOver = useAppSelector(GameIsOver);
  const isSubmiting = useAppSelector((r) => r.game.isSubmiting);
  const hints = useAppSelector(HintsLeft);

  const ResetPopup = () => {
    dispatch(setBubble(null));
  };

  const handleReset = () => {
    cancel();
    ResetPopup();
    dispatch(popInput());
  };

  const handleShuffle = () => {
    cancel();
    ResetPopup();
    dispatch(shufflePieces());
  };

  const handleSubmit = () => {
    cancel();
    if (isSubmiting) return;
    ResetPopup();
    dispatch(submit({ fail: fail, success: success }));
  };

  return (
    <React.Fragment>
      <View style={styles.controls}>
        <View style={styles.controls__buttonrow}>
          <View style={styles.controls__left}>
            <View style={{ position: "relative" }}>
              <IconButton
                size={30}
                style={{ backgroundColor: "#f0f4fa", borderRadius: 8 }}
                disabled={isOver || hints < 1}
                onPress={handleHint}
                icon={() => <LampIcon size={28} color="black" />}
              />
              <Text
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  fontFamily: "Montserrat-Regular",
                  fontSize: 12,
                  color: "black",
                }}
              >
                {hints}
              </Text>
            </View>
            <IconButton
              size={30}
              style={{ backgroundColor: "#f0f4fa", borderRadius: 8 }}
              onPress={() => dispatch(setOpenModal("share"))}
              icon={() => <ShareIcon size={28} color="black" />}
            />
          </View>
          <View style={styles.controls__left}>
            <IconButton
              size={30}
              style={{ backgroundColor: "#f0f4fa", borderRadius: 8 }}
              disabled={isOver}
              onPress={handleReset}
              icon={() => <DeleteIcon size={28} color="black" />}
            />
            <IconButton
              size={30}
              style={{ backgroundColor: "#f0f4fa", borderRadius: 8 }}
              onPress={handleShuffle}
              icon={() => <ShuffleIcon size={28} color="black" />}
            />
            <Button
              style={{ borderRadius: 8 }}
              buttonColor="black"
              labelStyle={{ color: "white", fontSize: 18 }}
              disabled={isOver}
              onPress={handleSubmit}
            >
              Submit
            </Button>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

export default Controls;

const styles = StyleSheet.create({
  controls: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    paddingTop: 15,
    justifyContent: "center",
  },
  controls__buttonrow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
  },
  controls__left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  controls__right: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  controls__button: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    width: 48,
    height: 48,
    marginRight: 5,
  },
  hint__container: {
    color: "",
    display: "flex",
    width: "100%",
    height: "100%",
    // background:
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 7,
    position: "relative",
  },
  hint__label: {
    zIndex: 2,
    top: 2,
    right: 5,
    position: "absolute",
    fontSize: 12,
    fontWeight: "700",
  },
});
