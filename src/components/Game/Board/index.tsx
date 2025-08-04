import React, { FC, memo, useCallback } from "react";
import WordPiece from "./Piece";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  addToInput,
  GamePieces,
  setBubble,
  setInput,
} from "@/redux/Slices/Game";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { Piece } from "@/model";
import { Audio } from "expo-av";
import { player } from "@/components/wrappers/PostHydration";

type Props = {
  trigger?: () => void;
  cancel: (str?: string) => void;
  hints: string[];
  resetHints: () => void;
};

const Gameboard: FC<Props> = ({ cancel, hints, resetHints }) => {
  const dispatch = useAppDispatch();
  const input = useAppSelector((r) => r.game.input);

  const pieces = useAppSelector(GamePieces);
  const isSoundDisabled = useAppSelector((r) => r.options.disableSound);

  const ResetPopup = () => {
    dispatch(setBubble(null));
  };

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("@/../assets/sound/c1.mp3")
    );

    console.log("Playing Sound");
    await sound.playAsync();
  }

  const handlePress = (text: string) => {
    cancel(text);
    ResetPopup();
    resetHints();

    if (input.includes(text)) {
      dispatch(setInput(input.slice().filter((e) => e !== text)));
      if (!isSoundDisabled) player.Click();
    } else {
      // if (input.length > 3) {
      //     dispatch(setBubble({ 'type': 'bad', 'message': `Max length is 4` }))
      //     return
      // }
      dispatch(addToInput(text));
      if (!isSoundDisabled) player.Click();
    }
  };

  const _renderItem = (e: ListRenderItemInfo<Piece>) => {
    return (
      <WordPiece
        isHinted={hints.includes(e.item.label)}
        key={e.item.label}
        label={e.item.label}
        usesLeft={e.item.number}
        isUsing={input.includes(e.item.label)}
        onPress={handlePress}
      />
    );
  };

  return (
    <FlatList
      horizontal={false}
      numColumns={3}
      data={pieces}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
      style={styles.gameboard}
      contentContainerStyle={{}}
    />
  );
};

const styles = StyleSheet.create({
  gameboard: {
    display: "flex",
    marginTop: 6,
  },
});

const _keyExtractor = (r: Piece) => r.label;

export default Gameboard;
