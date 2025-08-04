import { useAppSelector } from "@/redux";
import { GameAllWords, GameFoundWords } from "@/redux/Slices/Game";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  wordsFound: string[];
  bonusFound: string[];
  dailyBonus: string;
};

const ByOrder: FC<Props> = ({ wordsFound, bonusFound, dailyBonus }) => {
  const words = useAppSelector(GameFoundWords);
  const all = useAppSelector(GameAllWords);

  return (
    <React.Fragment>
      {/* <div className="flex flex-row flex-wrap">
        {wordsFound.map((e) => {
          return (
            <div key={e} className="foundwords__element">
              {e}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col mt-3">
        {bonusFound.length > 0 && (
          <div className="foundwords__list-caption">Bonus words </div>
        )}
        <div className="flex flex-row flex-wrap">
          {bonusFound.map((e) => {
            return (
              <div
                key={e}
                className={
                  e === dailyBonus
                    ? "foundwords__element special"
                    : "foundwords__element"
                }
              >
                {e}
              </div>
            );
          })}
        </div>
      </div> */}
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.counter}>
            Words found:{" "}
            <Text style={{ fontFamily: "Montserrat-Bold" }}>
              {words.length} / {all.length}
            </Text>
          </Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {wordsFound.map((e) => {
            return (
              <View key={e} style={styles.element}>
                <Text style={styles.element__label}>{e}</Text>
              </View>
            );
          })}
        </View>
        {bonusFound.length > 0 && (
          <View
            style={{
              marginTop: 12,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 15 }}>
              Bonus words
            </Text>
          </View>
        )}
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {bonusFound.map((e) => {
            return (
              <View
                style={[styles.element, e === dailyBonus && styles.special]}
                key={e}
              >
                <Text style={styles.element__label}>{e}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </React.Fragment>
  );
};

export default ByOrder;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 4,
  },
  counter: {
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
  },
  element: {
    marginRight: 9,
    marginTop: 7,
    backgroundColor: "#f1f6fc",
    borderRadius: 6,
    // font-size: 15px;
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: "black",
  },
  element__label: {
    fontFamily: "Montserrat-Regular",
    fontSize: 15,
  },
  special: {},
});
