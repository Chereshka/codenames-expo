import { useAppDispatch } from "@/redux";
import { setOpenModal } from "@/redux/Slices/Navigation";
import { FC } from "react";
import { Pressable, View } from "react-native";
import { ProgressBar } from "react-native-paper";

type Props = {
  current: number;
  max: number;
};

const Percentbar: FC<Props> = ({ current, max }) => {
  const dispatch = useAppDispatch();
  return (
    <Pressable
      style={{ marginTop: 10 }}
      onPress={() => dispatch(setOpenModal("rankings"))}
    >
      <ProgressBar
        color="#f6bf2a"
        progress={current > 0 ? current / max : 0}
        style={{ height: 12, borderRadius: 8 }}
      />
    </Pressable>
  );
};

export default Percentbar;
