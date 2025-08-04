import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import GameStamp from "./GameStamp";
import { IconButton, Menu, Text } from "react-native-paper";
import CalendarIcon from "@/components/icons/CalendarIcon";
import { useNavigation } from "expo-router";
import { useAppDispatch } from "@/redux";
import { setOpenModal } from "@/redux/Slices/Navigation";
import Logo from "./Logo";
import MoreIcon from "@/components/icons/MoreIcon";

export default function Header() {
  const navigator = useNavigation();
  const dispatch = useAppDispatch();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleMenuPress = (modal: any) => {
    setVisible(false);
    dispatch(setOpenModal(modal));
  };

  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <Logo />
      </View>
      <View style={styles.right}>
        {/* <IconButton
          style={{ padding: 0, margin: 0 }}
          onPress={() => navigator.navigate("puzzles/index" as never)}
          icon={() => <CalendarIcon size={24} color="black" />}
        /> */}
        <IconButton
          style={{ padding: 0, margin: 0 }}
          onPress={() => dispatch(setOpenModal("stats"))}
          icon={() => <CalendarIcon size={24} color="black" />}
        />
        <Menu
          contentStyle={{ backgroundColor: "#faf7f1" }}
          visible={visible}
          onDismiss={closeMenu}
          anchorPosition="bottom"
          anchor={
            <IconButton
              size={24}
              style={{ padding: 0, margin: 0 }}
              onPress={openMenu}
              icon={() => <MoreIcon size={24} color="black" />}
            />
          }
        >
          <Menu.Item
            titleStyle={{ color: "black", fontFamily: "Montserrat-Regular" }}
            onPress={() => handleMenuPress("stats")}
            title="Statistics"
          />
          <Menu.Item
            titleStyle={{ color: "black", fontFamily: "Montserrat-Regular" }}
            onPress={() => handleMenuPress("settings")}
            title="Settings"
          />
          <Menu.Item
            titleStyle={{ color: "black", fontFamily: "Montserrat-Regular" }}
            onPress={() => handleMenuPress("help")}
            title="Help"
          />
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#faf7f1",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    paddingLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    paddingRight: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});
