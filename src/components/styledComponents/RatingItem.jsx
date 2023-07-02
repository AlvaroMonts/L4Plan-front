import React from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import { View, StyleSheet } from "react-native";

const RatingItem = ({ rating }) => {
  return (
    <View style={styles.container}>
      <Rating
        ratingBackgroundColor="black"
        ratingColor="black"
        fractions={1}
        startingValue={rating}
        readonly
        imageSize={18}
      />
    </View>
  );
};

{
  /* 
  <Rating
    style={styles.rating}
    fractions={1}
    startingValue={rating}
    readonly
      imageSize={18}
    starContainerStyle={styles.starContainer}
  /> 
  <AirbnbRating
    style={styles.rating}
    fractions={1}
    count={5}
    defaultRating={rating}
    showRating={false}
    isDisabled
    starContainerStyle={styles.starContainer}
  />      
  */
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export default RatingItem;
