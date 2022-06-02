import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
const Header = ({ navigation }) => {
  return (
    <Appbar style={styles.header}>
      <Appbar.Content title="乖寶寶簽到網" />
      <Appbar.Action icon="home" onPress={() => navigation.navigate("Sign")} />
    </Appbar>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f50057",
  },
});
