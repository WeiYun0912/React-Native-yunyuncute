import { useQuery, useMutation } from "@apollo/client";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ImageBackground,
  Alert,
} from "react-native";
import { MUTATION_EXCHANGE_REWARD, QUERY_YUN, QUERY_REWARDS } from "../gql/gql";
import { Button, Card } from "react-native-paper";
const Reward = () => {
  const {
    data: yun,
    loading: yunLoading,
    refetch: yunRefetch,
  } = useQuery(QUERY_YUN);

  const { data: rewards, loading: rewardLoading } = useQuery(QUERY_REWARDS);

  const [exchangeRewards] = useMutation(MUTATION_EXCHANGE_REWARD);

  const exchangeRewardAlert = (name, point) =>
    Alert.alert("要兌換嗎?", "真的確定要兌換嗎!", [
      {
        text: "對啦",
        onPress: () => {
          exchangeRewardFunc(name, point);
        },
      },
      {
        text: "不要啦",
      },
    ]);

  const exchangeRewardFunc = async (name, point) => {
    await exchangeRewards({
      variables: {
        input: {
          name,
          point,
        },
      },
    });

    yunRefetch();
  };

  if (yunLoading || rewardLoading) {
    return <Text style={styles.Point}>Loading...</Text>;
  }

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View>
          <Text style={styles.Point}>芸芸目前共有：{yun.yun.points}點</Text>
        </View>
        <ScrollView style={{ padding: 10, marginBottom: 20 }}>
          {rewards.rewards
            .slice()
            .sort((a, b) => a.point - b.point)
            .map((reward) => (
              <Card
                key={reward.id}
                style={{
                  marginVertical: 10,
                }}
              >
                <Card.Title
                  title={reward.name}
                  titleStyle={{ textAlign: "center" }}
                />
                <Card.Cover
                  source={{ uri: reward.image }}
                  style={{ width: 200, alignSelf: "center" }}
                />
                <Card.Content>
                  <Text style={styles.text}>{reward.point} 點</Text>
                  <Text style={styles.text}>{reward.description}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button
                    mode="contained"
                    color="#f50057"
                    labelStyle={{ fontSize: 20 }}
                    style={{ width: "100%" }}
                    onPress={() =>
                      exchangeRewardAlert(reward.name, reward.point)
                    }
                  >
                    <Text>兌換</Text>
                  </Button>
                </Card.Actions>
              </Card>
            ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Reward;

const styles = StyleSheet.create({
  Point: {
    fontSize: 24,
    marginTop: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    margin: 5,
    fontSize: 15,
  },
});
