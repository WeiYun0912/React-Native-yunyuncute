import { useQuery } from "@apollo/client";
import { StyleSheet, View, Text } from "react-native";
import { QUERY_YUN } from "../gql/gql";

const Reward = () => {
  const {
    data: yun,
    loading: yunLoading,
    refetch: yunRefetch,
  } = useQuery(QUERY_YUN);

  if (yunLoading) {
    return <Text style={styles.Point}>Loading...</Text>;
  }

  return (
    <View>
      <Text style={styles.Point}>{yun.yun.points}</Text>
    </View>
  );
};

export default Reward;

const styles = StyleSheet.create({
  Point: {
    color: "#fff",
  },
});
