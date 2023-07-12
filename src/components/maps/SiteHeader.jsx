import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Platform } from "react-native";
import StyledText from "../../components/styledComponents/StyledText";

const SiteHeader = ({ photo, name, isOpen }) => {
  const defaultImage = require("../../../assets/no-image.jpg");

  return (
    <View style={styles.row}>
      {Platform.OS !== "android" && (
        <View style={styles.columnImage}>
          <Image
            style={styles.image}
            source={photo ? { uri: photo } : defaultImage}
            defaultSource={defaultImage}
          />
        </View>
      )}
      <View style={styles.columnMainData}>
        <StyledText fontSize="subheading" fontWeight="bold">
          {name}
        </StyledText>
        {isOpen !== undefined && (
          <StyledText style={styles.opened}>
            {isOpen ? "🟢 Abierto" : "🔴 Cerrado"}
          </StyledText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    parddingBottom: 4,
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 6,
    resizeMode: "cover",
  },
  columnImage: {
    padding: 4,
  },
  columnMainData: {},
  opened: {
    flexDirection: "row",
    paddingVertical: 4,
  },
});

export default SiteHeader;
