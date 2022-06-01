import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Button } from "react-native-paper";
import { DataTable } from "react-native-paper";
import { useQuery } from "@apollo/client";
import { QUERY_YUN, QUERY_SIGN } from "../gql/gql";
import SimpleDateTime from "react-simple-timestamp-to-date";

const Sign = (props) => {
  const {
    data: yunData,
    loading: yunLoading,
    refetch: yunRefetch,
  } = useQuery(QUERY_YUN);
  const {
    data: signData,
    loading: signRecord,
    refetch: signRefetch,
  } = useQuery(QUERY_SIGN);

  const pressMusic = async () => {};

  if (yunLoading || signRecord) {
    return <Text>Loading...</Text>;
  }
  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={{ padding: 10 }}>
        <View style={styles.SignContainer}>
          <Button
            mode="contained"
            icon="sign-text"
            labelStyle={{ fontSize: 20 }}
            color="#f50057"
            onPress={pressMusic}
          >
            <Text>簽到</Text>
          </Button>
        </View>
        <View style={styles.TableContainer}>
          <DataTable style={{ backgroundColor: "#fff" }}>
            <DataTable.Header>
              <DataTable.Title>簽到日期</DataTable.Title>
              <DataTable.Title>簽到時間</DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {signData.signRecord?.map((record) => (
                <DataTable.Row key={record.signAt}>
                  <DataTable.Cell>
                    <SimpleDateTime
                      dateSeparator="-"
                      format="MYD"
                      timeSeparator=":"
                      meridians="1"
                      showTime="0"
                    >
                      {record.signAt}
                    </SimpleDateTime>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <SimpleDateTime
                      dateSeparator="-"
                      format="MYD"
                      timeSeparator=":"
                      showDate="0"
                    >
                      {record.signAt}
                    </SimpleDateTime>
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

export default Sign;

const styles = StyleSheet.create({
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
