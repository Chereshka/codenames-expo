import { useAppDispatch, useAppSelector } from "@/redux";
import { loadArchive } from "@/redux/Slices/Game";
import { getPuzzleIndexForDate } from "@/utils/puzzle";
import Header from "@/views/Archive/Header";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  ProgressBar,
  Text,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArchiveElement from "./ArchiveItem";
import ArrowDown from "@/components/icons/ArrowDown";
import { useNavigation } from "expo-router";

export interface ArchiveSnap {
  id: number;
  found: number;
  total: number;
}

interface Filter {
  by: "id" | "progress";
  direction: "asc" | "desc";
  id: number;
}

const filters: Filter[] = [
  { id: 0, by: "id", direction: "asc" },
  { id: 1, by: "id", direction: "desc" },
  { id: 2, by: "progress", direction: "asc" },
  { id: 3, by: "progress", direction: "desc" },
];

export default function Archive() {
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const archive = useAppSelector((r) => r.game.archive);
  const preview = useAppSelector((r) => r.game.archivePreview);

  const [filter, setFilter] = useState<Filter>(filters[0]);

  const Available = useMemo(() => {
    const reform = preview.map((e) => {
      return {
        id: e.id,
        found: archive[e.id]?.foundWords.length || 0,
        total: e.total,
      };
    });
    return reform;
  }, [preview, archive]);

  const Played = useMemo(
    () => Available.filter((e) => e.found > 0),
    [Available]
  );
  const Completed = useMemo(
    () => Available.filter((e) => e.found > 0 && e.found === e.total),
    [Available]
  );

  const List = useMemo(() => {
    switch (filter.by + "_" + filter.direction) {
      case "id_desc":
        return Available;
      case "id_asc":
        return Available.slice().reverse();
      case "progress_desc":
        return Available.slice().sort(
          (a, b) => b.found / b.total - a.found / a.total
        );
      case "progress_asc":
        return Available.slice().sort(
          (a, b) => a.found / a.total - b.found / b.total
        );
      default:
        return Available;
    }
  }, [filter, Available]);

  const Percentage = useMemo(() => {
    const all = Available.reduce((a, b) => a + b.total, 0);
    const allFound = Available.reduce((a, b) => a + b.found, 0);
    if (all === 0 || allFound === 0) return 0;
    return Math.round((allFound / all) * 100);
  }, [Available]);

  useEffect(() => {
    const Load = async () => {
      dispatch(loadArchive());
    };
    Load();
  }, []);

  const changeSort = () => {
    setFilter((e) => filters[(e.id + 1) % 4]);
  };

  const isLoading = useAppSelector((r) => r.game.archiveLoading);

  const navigation = useNavigation();
  const todayId = getPuzzleIndexForDate(new Date());

  const handleClick = (snap: ArchiveSnap) => {
    const isDaily = todayId === snap.id;
    if (isDaily) {
      navigation.navigate({
        name: "index",
        params: { replace: true },
      } as never);
      return;
    }
    navigation.navigate({
      name: `game/[id]`,
      params: { id: snap.id, replace: true },
    } as never);
  };

  const _render = (e: any) => {
    return <ArchiveElement snap={e.item} onPress={handleClick} />;
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Header />
      <View
        style={{
          marginTop: 8,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            fontFamily: "Montserrat-Bold",
            color: "black",
          }}
        >
          Archive Games
        </Text>
      </View>
      <View style={{ marginTop: 6, marginHorizontal: 8 }}>
        <ProgressBar
          color="#f6bf2a"
          progress={Percentage / 100}
          style={{ height: 12, borderRadius: 8 }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 6,
        }}
      >
        <Button mode="text" onPress={changeSort}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Text>sort by {filter.by}</Text>
            {filter.direction === "desc" ? (
              <ArrowDown size={16} color="black" />
            ) : (
              <ArrowDown size={16} color="black" rotate />
            )}
          </View>
        </Button>
      </View>
      <FlatList
        ListEmptyComponent={<ActivityIndicator />}
        keyExtractor={_extractor}
        renderItem={_render}
        data={List}
      />
      <View
        style={{ height: 80, justifyContent: "center", alignItems: "center" }}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Montserrat-Bold",
          }}
        >
          ADS
        </Text>
      </View>
    </View>
  );
}

const _extractor = (e: any) => {
  return e.id;
};
