import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
const Header = () => {
  return (
    <Appbar style={styles.bottom}>
      <Appbar.Content title="乖寶寶簽到網" />
      <Appbar.Action
        icon="home"
        onPress={() => console.log("Pressed delete")}
      />
    </Appbar>
  );
};

export default Header;

const styles = StyleSheet.create({
  bottom: {
    // position: "sticky",
    backgroundColor: "#f50057",
    // top: 0,
    // left: 0,
    // right: 0,
    // zIndex: 9999,
  },
});
