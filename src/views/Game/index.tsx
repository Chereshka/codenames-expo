import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Header from "./Header";
import Scorebar from "@/components/Game/Scorebar";
import Foundlist from "@/components/Game/Foundlist";
import Input from "@/components/Game/Input";
import { noop } from "@/utils";
import Gameboard from "@/components/Game/Board";
import Controls from "@/components/Game/Controls";
import {
  consumeHint,
  GameAllWords,
  GameFoundWords,
  GameIsOver,
  GameSolutions,
  HintsLeft,
  loadDailyPuzzle,
  loadPuzzleById,
} from "@/redux/Slices/Game";
import { useAppDispatch, useAppSelector } from "@/redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator, Text } from "react-native-paper";
import { useFocusEffect, useLocalSearchParams } from "expo-router";

export default function Game() {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const { id } = useLocalSearchParams<{ id: string }>();

  const isOver = useAppSelector(GameIsOver);
  const submiting = useAppSelector((r) => r.game.isSubmiting);
  const words = useAppSelector(GameAllWords);
  const found = useAppSelector(GameFoundWords);
  const solutions = useAppSelector(GameSolutions);
  const popupVisible = useAppSelector((r) => r.game.messageBubble);
  const disable = useAppSelector((r) => r.options.disableAnimation);
  const input = useAppSelector((r) => r.game.input);
  const isNewPlayer = useAppSelector((r) => r.game.isNewPlayer);
  const hintsCount = useAppSelector(HintsLeft);
  const isLoading = useAppSelector((r) => r.game.puzzleLoading);

  const [visible, setVisible] = useState(true);
  const [hints, setHints] = useState<string[]>([]);

  useEffect(() => {
    const Load = async () => {
      if (id === "-1") {
        dispatch(loadDailyPuzzle());
      } else {
        dispatch(loadPuzzleById(Number(id)));
      }
    };
    Load();
  }, [dispatch, id]);

  const handleHint = () => {
    if (hintsCount < 1) return;
    dispatch(consumeHint());
    const available = words.filter((e) => !found.includes(e));
    const randomWord = available[Math.floor(Math.random() * available.length)];
    if (randomWord in solutions) {
      setHints(solutions[randomWord]);
    }
  };

  const resetHints = () => {
    setHints([]);
  };

  const [isFoundWordsOpen, setIsFoundWordsOpen] = useState<boolean>(false);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingRight: insets.right,
        paddingLeft: insets.left,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={{ flex: 1 }}>
        <Header />
        {!isLoading ? (
          <View style={{ padding: 5 }}>
            <Scorebar />
            <Foundlist
              isFoundWordsOpen={isFoundWordsOpen}
              setIsFoundWordsOpen={setIsFoundWordsOpen}
            />
            <Input
              bad={noop}
              good={noop}
              trayVisible={
                visible && input.length < 1 && !popupVisible && !isOver
              }
            />
            <Gameboard cancel={noop} hints={hints} resetHints={resetHints} />
            <Controls
              cancel={noop}
              fail={noop}
              success={noop}
              handleHint={handleHint}
            />
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#f6bf2a" />
          </View>
        )}
        <View
          style={{ height: 80, justifyContent: "center", alignItems: "center" }}
        >
          <Text>ADS</Text>
        </View>
      </View>
    </View>
  );
}
