import { useQuery } from "@apollo/client";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Button } from "react-native-paper";
import { DataTable } from "react-native-paper";
import { QUERY_LOTTERY } from "../gql/gql";
import SimpleDateTime from "react-simple-timestamp-to-date";

const Lottery = () => {
  const {
    data: lotteryRecord,
    loading: lotteryLoading,
    refetch: lotteryRefetch,
  } = useQuery(QUERY_LOTTERY);

  if (lotteryLoading) {
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
          <Text style={styles.text}>芸芸目前簽到了 10000 天</Text>
        </View>
        <Button
          mode="contained"
          icon="gamepad-variant"
          labelStyle={{ fontSize: 20 }}
          color="#f50057"
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
              {lotteryRecord.lottery?.map((record) => (
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
    fontSize: 26,
    margin: 10,
  },
  SignContainer: {
    marginTop: 20,
  },
  TableContainer: {
    // width: "100%",
    height: "75%",
    marginTop: 20,
    // paddingHorizontal: 48,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
