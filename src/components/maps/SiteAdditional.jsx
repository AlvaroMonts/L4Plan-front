import React from "react";
import { View } from "react-native";
import StyledText from "../../components/styledComponents/StyledText";

const SiteAdditional = ({ address, phone }) => {
  return (
    <View>
      <StyledText fontSize="body">{address}</StyledText>
      <StyledText fontSize="body">{phone}</StyledText>
    </View>
  );
};

export default SiteAdditional;
