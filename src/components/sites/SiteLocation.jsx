import React from "react";
import { View } from "react-native";
import StyledText from "../../components/styledComponents/StyledText";

const SiteLocation = ({ address, description }) => {
  return (
    <View>
      <StyledText fontSize="body">{address}</StyledText>
      <StyledText
        fontSize="body"
        color="secondary"
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        {description}
      </StyledText>
    </View>
  );
};

export default SiteLocation;
