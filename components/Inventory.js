import { useQuery } from "@apollo/client";

import { QUERY_INVENTORY } from "../gql/gql";
import { DataTable, Button } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import SimpleDateTime from "react-simple-timestamp-to-date";
import { useEffect } from "react";

const Inventory = ({ navigation }) => {
  const { data, loading, refetch } = useQuery(QUERY_INVENTORY);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={{ padding: 10 }}>
        <View style={styles.TableContainer}>
          <DataTable style={{ backgroundColor: "#fff" }}>
            <DataTable.Header>
              <DataTable.Title>抽獎時間</DataTable.Title>
              <DataTable.Title>獎品</DataTable.Title>
              <DataTable.Title>狀態</DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {data.inventory
                .slice()
                .sort((a, b) => b.exchangeDate - a.exchangeDate)
                .map((reward) => (
                  <DataTable.Row key={reward.id}>
                    <DataTable.Cell>
                      <SimpleDateTime
                        dateSeparator="-"
                        format="MYD"
                        timeSeparator=":"
                        showTime="0"
                      >
                        {reward.exchangeDate}
                      </SimpleDateTime>
                    </DataTable.Cell>
                    <DataTable.Cell>{reward.name}</DataTable.Cell>
                    <DataTable.Cell>
                      {!reward.isExchange ? (
                        <Button
                          mode="contained"
                          style={{ backgroundColor: "#82DBD8" }}
                        >
                          <Text>兌換</Text>
                        </Button>
                      ) : (
                        <Text>已兌換</Text>
                      )}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
            </ScrollView>
          </DataTable>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Inventory;

const styles = StyleSheet.create({
  TableContainer: {
    // width: "100%",
    height: "90%",
    marginTop: 20,
    // paddingHorizontal: 48,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
