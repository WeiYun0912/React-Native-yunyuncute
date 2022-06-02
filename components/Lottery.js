import { useQuery, useMutation } from "@apollo/client";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { DataTable } from "react-native-paper";
import { MUTATION_PLAY_LOTTERY, QUERY_LOTTERY, QUERY_YUN } from "../gql/gql";
import SimpleDateTime from "react-simple-timestamp-to-date";
import getReward from "../helper/getReward";

const Lottery = () => {
  const {
    data: lotteryRecord,
    loading: lotteryLoading,
    refetch: lotteryRefetch,
  } = useQuery(QUERY_LOTTERY);

  const {
    data: yunData,
    loading: yunLoading,
    refetch: yunRefetch,
  } = useQuery(QUERY_YUN);

  const [playLottery] = useMutation(MUTATION_PLAY_LOTTERY);

  const playLotteryAlert = () =>
    Alert.alert("要抽獎嗎?", "真的確定要抽嗎!", [
      {
        text: "對啦",
        onPress: () => {
          playLotteryFunc();
        },
      },
      {
        text: "不要啦",
      },
    ]);

  const playLotteryFunc = async () => {
    const rmn = Math.floor(Math.random() * 100);
    const reward = getReward(rmn);

    if (reward?.points) {
      await playLottery({
        variables: {
          input: {
            name: reward.name,
            points: reward.points,
          },
        },
      });
    } else {
      await playLottery({
        variables: {
          input: {
            name: reward.name,
          },
        },
      });
    }
    lotteryRefetch();
    yunRefetch();
  };

  if (lotteryLoading || yunLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={{ padding: 10 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.text}>簽到五天以上可以抽獎哦!</Text>
          <Text style={styles.text}>
            芸芸目前簽到了 {yunData.yun.signDays} 天
          </Text>
        </View>
        <Button
          mode="contained"
          icon="gamepad-variant"
          labelStyle={{ fontSize: 20 }}
          color="#f50057"
          onPress={playLotteryAlert}
        >
          <Text>抽獎</Text>
        </Button>

        <View style={styles.TableContainer}>
          <DataTable style={{ backgroundColor: "#fff" }}>
            <DataTable.Header>
              <DataTable.Title>抽獎時間</DataTable.Title>
              <DataTable.Title>獎品</DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {lotteryRecord.lottery
                ?.slice()
                .sort((a, b) => b.lotteryDate - a.lotteryDate)
                .map((record) => (
                  <DataTable.Row key={record.id}>
                    <DataTable.Cell>
                      <SimpleDateTime
                        dateSeparator="-"
                        format="MYD"
                        timeSeparator=":"
                      >
                        {record.lotteryDate}
                      </SimpleDateTime>
                    </DataTable.Cell>
                    <DataTable.Cell>{record.name}</DataTable.Cell>
                  </DataTable.Row>
                ))}
            </ScrollView>
          </DataTable>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Lottery;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    margin: 10,
  },
  SignContainer: {
    marginTop: 20,
  },
  TableContainer: {
    // width: "100%",
    height: "60%",
    marginTop: 20,
    // paddingHorizontal: 48,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
