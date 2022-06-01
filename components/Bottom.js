import { BottomNavigation, Text } from "react-native-paper";
import { useState } from "react";
import Sign from "./Sign";

const MusicRoute = () => <Sign />;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const Bottom = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "music",
      title: "Music",
      icon: "music",
      color: "#3F51B5",
      activeColor: "#3F51B5",
    },
    {
      key: "albums",
      title: "Albums",
      icon: "album",
      color: "#009688",
      activeColor: "#009688",
    },
    {
      key: "recents",
      title: "Recents",
      icon: "history",
      color: "#795548",
      activeColor: "#795548",
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
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
