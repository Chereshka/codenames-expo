import { FC, memo, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { ArchiveSnap } from ".";
import { dateFromPuzzleIndex } from "@/utils/puzzle";
import { Rating } from "@kolking/react-native-rating";

type Props = {
  snap: ArchiveSnap;
  onPress: (snap: ArchiveSnap) => void;
};

const ArchiveElement: FC<Props> = ({ snap, onPress }) => {
  const releaseDate = dateFromPuzzleIndex(snap.id)
    .toLocaleDateString("en-us", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .replace(/,/g, "");

  const rating = useMemo(() => {
    return (snap.found / snap.total) * 5;
  }, [snap]);

  return (
    <Pressable onPress={() => onPress(snap)} style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.label_id}>#{snap.id}</Text>
        <Text style={styles.label__date}>{releaseDate}</Text>
      </View>
      <View style={styles.right}>
        {snap.found > 0 ? (
          <Rating
            baseColor="#d3dce7"
            fillColor="#ffd968"
            size={24}
            rating={rating}
          />
        ) : (
          <Text style={styles.label__count}>{snap.total} WORDS</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f4f9",
    padding: 10,
    margin: 5,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    display: "flex",
    flexDirection: "column",
  },
  right: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  label_id: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    marginBottom: 4,
    color: "black",
  },
  label__date: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: "#858f9d",
    marginTop: 4,
  },
  label__count: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: "#858f9d",
  },
});

export default memo(ArchiveElement);
