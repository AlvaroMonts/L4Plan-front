import { View, StyleSheet } from "react-native";
import React from "react";
import SiteHeader from "./SiteHeader";
import SiteAdditional from "./SiteAdditional";

const SitePinView = ({ details, photo }) => {
  // console.log(photo);
  return (
    <View style={styles.container}>
      <SiteHeader
        style={styles.header}
        photo={photo}
        name={details?.name}
        isOpen={details?.current_opening_hours?.open_now}
      />
      <SiteAdditional
        phone={details?.international_phone_number}
        address={details?.formatted_address}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    borderRadius: 6,
    paddingHorizontal: 6,
    backgroundColor: "white",
  },
  header: {
    flex: 1,
  },
});

export default SitePinView;
