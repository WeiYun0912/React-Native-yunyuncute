import { StyleSheet, ImageBackground } from "react-native";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tabs = createMaterialBottomTabNavigator();
//components
import Header from "./components/Header";
// import Bottom from "./components/Bottom";
import Lottery from "./components/Lottery";
import Sign from "./components/Sign";
import Reward from "./components/Reward";
import Inventory from "./components/Inventory";

const SignStack = createStackNavigator();
const RewardStack = createStackNavigator();
const LotteryStack = createStackNavigator();
// const Tabs = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

const SignStackScreen = () => (
  <SignStack.Navigator screenOptions={{ header: Header }}>
    <SignStack.Screen name="A" component={Sign} />
  </SignStack.Navigator>
);

const RewardStackScreen = () => (
  <RewardStack.Navigator screenOptions={{ header: Header }}>
    <RewardStack.Screen name="B" component={Reward} />
  </RewardStack.Navigator>
);

const LotteryStackScreen = () => (
  <LotteryStack.Navigator screenOptions={{ header: Header }}>
    <LotteryStack.Screen name="C" component={Lottery} />
  </LotteryStack.Navigator>
);

const InventoryStackScreen = () => (
  <LotteryStack.Navigator screenOptions={{ header: Header }}>
    <LotteryStack.Screen name="D" component={Inventory} />
  </LotteryStack.Navigator>
);

export default function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://yun-graphql.herokuapp.com/graphql",
  });
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <ImageBackground
          source={require("./assets/background.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <PaperProvider theme={theme}>
            <Tabs.Navigator
              screenOptions={{ headerShown: false }}
              shifting={true}
              initialRouteName="Sign"
            >
              <Tabs.Screen
                name="Sign"
                component={SignStackScreen}
                options={{
                  tabBarLabel: "簽到",
                  tabBarColor: "#D61C4E",
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="sign-text"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="Reward"
                component={RewardStackScreen}
                options={{
                  tabBarLabel: "兌換中心",
                  tabBarColor: "#FF8C8C",
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="cart"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="Lottery"
                component={LotteryStackScreen}
                options={{
                  tabBarLabel: "抽獎",
                  tabBarColor: "#FF5D5D",
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="gamepad-variant"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="Inventory"
                component={InventoryStackScreen}
                options={{
                  tabBarLabel: "物品欄",
                  tabBarColor: "#D61C4E",
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="bag-personal"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
            </Tabs.Navigator>
          </PaperProvider>
        </ImageBackground>
      </ApolloProvider>
    </NavigationContainer>
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
