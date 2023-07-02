import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import PlanItem from "./PlanItem";
import { useIsFocused } from "@react-navigation/native";

const PlanList = ({ data, placeId, placeName, refetch, loading }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        ItemSeparatorComponent={() => <Text></Text>}
        renderItem={({ item }) => (
          <PlanItem {...item} placeId={placeId} placeName={placeName} />
        )}
        refreshing={loading}
        onRefresh={refetch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlanList;
