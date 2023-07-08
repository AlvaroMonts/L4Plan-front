import React from "react";
import { View, Image, StyleSheet } from "react-native";
import StyledText from "../../components/styledComponents/StyledText";
import RatingItem from "../styledComponents/RatingItem";

const SiteMain = ({ position, photo, name, rating }) => {
  const defaultImage = require("../../../assets/no-image.jpg");

  return (
    <View style={styles.row}>
      <View style={styles.columnImage}>
        <Image
          style={styles.image}
          source={photo ? { uri: photo } : defaultImage}
          defaultSource={defaultImage}
        />
      </View>
      <View style={styles.columnText}>
        <StyledText fontSize="heading" fontWeight="bold">
          {position} {name}
        </StyledText>
        {rating && (
          <StyledText fontSize="body" color="secondary">
            <RatingItem rating={rating} />
            {rating}/5
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
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 6,
  },
  columnImage: {
    paddingRight: 8,
  },
  columnText: {
    flex: 1,
  },
  rowText: {
    flexDirection: "row",
  },
});

export default SiteMain;
