import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import SiteItem from "./SiteItem";
import { useIsFocused } from "@react-navigation/native";

const SiteList = ({ plan, places }) => {
  // plan is for load sites in plan view
  // places is the places list of the plan that are being loaded into the flatlist
  const isFocused = useIsFocused();
  const placeIds = places.map((place) => place.placeId);
  //  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      // console.log("HAZ REFETCH");
    }
  }, [isFocused]);

  return (
    <FlatList
      data={placeIds}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ _, index }) => (
        <SiteItem plan={plan} position={index + 1} placeId={placeIds[index]} />
      )}
      keyExtractor={(_, index) => index.toString()}
      //refreshing={loading}
      //onRefresh={refetch}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 16,
  },
});

export default SiteList;
