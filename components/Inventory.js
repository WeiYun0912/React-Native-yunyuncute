import { useQuery } from "@apollo/client";
import React from "react";
import { QUERY_INVENTORY } from "../gql/gql";
import { DataTable, Button } from "react-native-paper";

const Inventory = () => {
  const { data, loading, refetch } = useQuery(QUERY_INVENTORY);
  return <div>Inventory</div>;
};

export default Inventory;
