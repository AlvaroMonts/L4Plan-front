import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

function ImageSlider({ images }) {
  const [active, setActive] = useState(0);

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={change}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{
              uri: image,
            }}
            style={styles.image}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((i, k) => (
          <Text
            key={k}
            style={k === active ? styles.pagingText : styles.pagingActiveText}
          >
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 250,
    marginVertical: 15,
    borderRadius: 15,
  },
  image: {
    width: 350,
    height: 250,
    zIndex: -2,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  pagingText: {
    color: "#888",
    margin: 3,
  },
  pagingActiveText: {
    color: "#fff",
    margin: 3,
  },
});

export default ImageSlider;
