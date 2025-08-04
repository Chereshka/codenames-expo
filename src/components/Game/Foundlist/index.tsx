import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { Solution } from "@/model";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  DailyWord,
  GameAllBonus,
  GameAllWords,
  GameFoundBonus,
  GameFoundWords,
  GameSolutions,
  setGroupBy,
} from "@/redux/Slices/Game";
import React, { FC, useMemo, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Path, Svg } from "react-native-svg";
import ByOrder from "./ByOrder";
import ByLength from "./ByLength";

export interface Mapped {
  [key: number]: string[];
}

type Props = {
  isFoundWordsOpen: boolean;
  setIsFoundWordsOpen: (state: boolean) => void;
};

export const Reform2 = (solutions: Solution) => {
  const form: Mapped = {
    2: [],
    3: [],
    4: [],
  };
  Object.keys(solutions).forEach((e) => {
    if (solutions[e].length > 4) return;
    form[solutions[e].length] = [...form[solutions[e].length], e];
  });
  return form;
};

const Foundlist: FC<Props> = ({ isFoundWordsOpen, setIsFoundWordsOpen }) => {
  const dispatch = useAppDispatch();

  const ref = useRef(null);

  const handleClickOutside = () => {
    console.log("outside");
    setIsFoundWordsOpen(false);
  };

  const mode = useAppSelector((r) => r.game.groupBy);

  const wordsFound = useAppSelector(GameFoundWords);
  const wordsTotal = useAppSelector(GameAllWords);
  const bonusAll = useAppSelector(GameAllBonus);
  const bonusFound = useAppSelector(GameFoundBonus);
  const x5 = useAppSelector(DailyWord);
  const solutions = useAppSelector(GameSolutions);

  const List = useMemo(() => Reform2(solutions), [solutions]);

  const button1 = useRef<HTMLButtonElement>(null);
  const button2 = useRef<HTMLButtonElement>(null);

  const handleChange = (e: any, state: boolean) => {
    // if (e.target === button1.current || e.target === button2.current) return;
    setIsFoundWordsOpen(state);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <View style={styles.foundwords}>
      <View
        style={[
          styles.foundwords__content,
          isFoundWordsOpen && { borderWidth: 0 },
        ]}
      >
        <Pressable onPress={(e) => handleChange(e, true)}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.foundwords__found,
              isFoundWordsOpen && { display: "none" },
            ]}
          >
            {wordsFound.length > 0
              ? wordsFound.slice().reverse().join(", ")
              : "Your words ..."}
          </Text>
          <Svg
            style={styles.foundwords__badge}
            width="13"
            height="8"
            viewBox="0 0 15 9"
            fill="none"
          >
            <Path
              d="M14.8167 0.203007C14.5724 -0.0676691 14.1774 -0.0676691 13.933 0.203007L7.49998 7.32879L1.06699 0.203007C0.822632 -0.0676691 0.42763 -0.0676691 0.18327 0.203007C-0.06109 0.473683 -0.06109 0.911224 0.18327 1.1819L7.05814 8.79715C7.18001 8.93215 7.34 9 7.50001 9C7.66003 9 7.82002 8.93215 7.94189 8.79715L14.8168 1.1819C15.0611 0.911224 15.0611 0.473683 14.8167 0.203007Z"
              fill="#6D7C95"
            />
          </Svg>
        </Pressable>
        <Pressable
          ref={ref}
          style={[
            styles.foundwords__dropdown,
            !isFoundWordsOpen && { display: "none" },
          ]}
          onPress={(e) => handleChange(e, false)}
        >
          <View style={styles.foundwords__title}>
            <Button
              labelStyle={{ fontFamily: "Montserrat-Regular", fontSize: 14 }}
              style={[
                styles.foundwords__selector,
                mode === "order" && styles.selector__active,
              ]}
              onPress={() => dispatch(setGroupBy("order"))}
            >
              By order
            </Button>
            <Button
              labelStyle={{ fontFamily: "Montserrat-Regular", fontSize: 14 }}
              style={[
                styles.foundwords__selector,
                mode === "length" && styles.selector__active,
              ]}
              onPress={() => dispatch(setGroupBy("length"))}
            >
              By combos
            </Button>
          </View>
          <Svg
            style={[styles.foundwords__badge]}
            rotation={180}
            width="13"
            height="8"
            viewBox="0 0 15 9"
            fill="none"
          >
            <Path
              d="M14.8167 0.203007C14.5724 -0.0676691 14.1774 -0.0676691 13.933 0.203007L7.49998 7.32879L1.06699 0.203007C0.822632 -0.0676691 0.42763 -0.0676691 0.18327 0.203007C-0.06109 0.473683 -0.06109 0.911224 0.18327 1.1819L7.05814 8.79715C7.18001 8.93215 7.34 9 7.50001 9C7.66003 9 7.82002 8.93215 7.94189 8.79715L14.8168 1.1819C15.0611 0.911224 15.0611 0.473683 14.8167 0.203007Z"
              fill="#6D7C95"
            />
          </Svg>
          <View
            style={{
              height: 400,
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {mode === "order" && (
              <ByOrder
                wordsFound={wordsFound.slice()}
                bonusFound={bonusFound.slice()}
                dailyBonus={x5}
              />
            )}
            {/* {mode === "length" && (
                <ByLength
                  wordsTotal={wordsTotal}
                  bonusTotal={bonusAll}
                  wordsFound={wordsFound}
                  bonusFound={bonusFound}
                  List={List}
                  dailyBonus={x5}
                />
              )} */}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Foundlist;

const styles = StyleSheet.create({
  foundwords: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    position: "relative",
    zIndex: 5,
    width: "100%",
  },
  foundwords__content: {
    borderRadius: 10,
    position: "relative",
    minHeight: 40,
    borderColor: "black",
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
  foundwords__found: {
    fontFamily: "Montserrat-Regular",
    textAlignVertical: "center",
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
    paddingRight: 30,
    height: 40,
    overflow: "hidden",
    textTransform: "capitalize",
  },
  foundwords__badge: {
    position: "absolute",
    top: 17,
    right: 14,
    zIndex: 5,
  },
  foundwords__dropdown: {
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: StyleSheet.hairlineWidth,
  },
  foundwords__title: {
    flexDirection: "row",
    justifyContent: "center",
  },
  foundwords__selector: {
    color: "black",
  },
  selector__active: {
    backgroundColor: "#e9eff5",
  },
});
