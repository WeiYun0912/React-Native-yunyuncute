import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Text,
} from "react-native";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Header from "./components/Header";
import Bottom from "./components/Bottom";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

export default function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://yun-graphql.herokuapp.com/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <PaperProvider theme={theme}>
          <Header />

          {/* <Sign /> */}

          <Bottom />
        </PaperProvider>
      </ImageBackground>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // paddingHorizontal: 48,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
