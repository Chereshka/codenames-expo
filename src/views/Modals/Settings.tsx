import DeleteIcon from "@/components/icons/DeleteIcon";
import { useAppDispatch, useAppSelector } from "@/redux";
import { setOpenModal } from "@/redux/Slices/Navigation";
import {
  darkMode,
  setDarkMode,
  setDisableAnimations,
  setDisableSounds,
} from "@/redux/Slices/Options";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  IconButton,
  Modal,
  Portal,
  Switch,
  Text,
  ToggleButton,
} from "react-native-paper";

export default function Settings() {
  const current = useAppSelector((r) => r.navigation.openModal);
  const dispatch = useAppDispatch();

  const isDark = useAppSelector(darkMode);
  const isDisableAnimations = useAppSelector((r) => r.options.disableAnimation);
  const isDisableSound = useAppSelector((r) => r.options.disableSound);

  const handleToggleDark = () => {
    dispatch(setDarkMode(!isDark));
  };

  const handleToggleSound = () => {
    dispatch(setDisableSounds(!isDisableSound));
  };

  const handleToggleAnimations = () => {
    dispatch(setDisableAnimations(!isDisableAnimations));
  };

  return (
    <React.Fragment>
      <Portal>
        <Modal
          visible={current === "settings"}
          onDismiss={() => dispatch(setOpenModal(undefined))}
          contentContainerStyle={styles.base}
        >
          <View>
            <View style={styles.headline}>
              <Text style={styles.headline__text}>Settings</Text>
              <IconButton
                onPress={() => dispatch(setOpenModal(undefined))}
                icon={() => <DeleteIcon size={24} color="black" />}
              />
            </View>
            <View style={styles.option}>
              <Switch
                style={{ transform: [{ scale: 1.2 }] }}
                value={isDark}
                onValueChange={handleToggleDark}
              />
              <Text style={styles.option__text}>Dark Mode</Text>
            </View>
            <View style={styles.option}>
              <Switch
                style={{ transform: [{ scale: 1.2 }] }}
                value={isDisableAnimations}
                onValueChange={handleToggleAnimations}
              />
              <Text style={styles.option__text}>Disable Animations</Text>
            </View>
            <View style={styles.option}>
              <Switch
                style={{ transform: [{ scale: 1.2 }] }}
                value={isDisableSound}
                onValueChange={handleToggleSound}
              />
              <Text style={styles.option__text}>Disable Sounds</Text>
            </View>
          </View>
        </Modal>
      </Portal>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  headline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headline__text: {
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
  },
  option: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 4,
  },
  option__text: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    marginLeft: 8,
  },
});
