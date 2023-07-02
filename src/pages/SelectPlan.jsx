import React from "react";
import { StyleSheet, View } from "react-native";
import Plans from "../pages/Plans";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const SelectPlan = ({ route }) => {
  const { placeId, placeName } = route?.params;

  return (
    <View style={styles.container}>
      <Plans placeId={placeId} placeName={placeName} />
    </View>
  );
};

export default SelectPlan;
