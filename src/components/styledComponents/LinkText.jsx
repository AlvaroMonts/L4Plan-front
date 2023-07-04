import React from "react";
import { Linking } from "react-native";
import StyledText from "./StyledText";

const LinkText = ({ url, text }) => {
  const handlePress = async () => {
    const validUrl = await Linking.canOpenURL(url);
    if (validUrl) {
      await Linking.openURL(url);
    }
  };

  return (
    <StyledText onPress={handlePress} style={{ color: "blue" }}>
      {text}
    </StyledText>
  );
};

export default LinkText;
