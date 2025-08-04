import DeleteIcon from "@/components/icons/DeleteIcon";
import { useAppDispatch, useAppSelector } from "@/redux";
import { setOpenModal } from "@/redux/Slices/Navigation";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Modal, Portal, Text } from "react-native-paper";

export default function Help() {
  const current = useAppSelector((r) => r.navigation.openModal);
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <Portal>
        <Modal
          visible={current === "help"}
          onDismiss={() => dispatch(setOpenModal(undefined))}
          contentContainerStyle={styles.base}
        >
          <View>
            <View style={styles.headline}>
              <Text style={styles.headline__text}>Help</Text>
              <IconButton
                onPress={() => dispatch(setOpenModal(undefined))}
                icon={() => <DeleteIcon size={24} color="black" />}
              />
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
  },
  option__text: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
  },
});
