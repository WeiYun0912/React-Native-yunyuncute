import { BottomNavigation, Text } from "react-native-paper";
import { useState } from "react";
import Sign from "./Sign";
import Lottery from "./Lottery";

const SignRoute = () => <Sign />;

const AlbumsRoute = () => <Lottery />;

const RecentsRoute = () => <Text>Recents</Text>;

const Bottom = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "folder",
      title: "兌換中心",
      icon: "folder",
      color: "#3F51B5",
      activeColor: "#3F51B5",
    },
    {
      key: "gamepad-variant",
      title: "抽獎",
      icon: "gamepad-variant",
      color: "#009688",
      activeColor: "#009688",
    },
    {
      key: "bag-personal",
      title: "物品欄",
      icon: "bag-personal",
      color: "#795548",
      activeColor: "#795548",
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    folder: SignRoute,
    "gamepad-variant": AlbumsRoute,
    "bag-personal": RecentsRoute,
  });
  return (
    <BottomNavigation
      barStyle={{ backgroundColor: "#fff" }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Bottom;
