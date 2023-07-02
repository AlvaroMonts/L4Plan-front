import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import StyledText from "../../components/styledComponents/StyledText";
import { useNavigation } from "@react-navigation/native";
import { hooksPlan } from "../../services/PlanService";
import { useUser } from "../../hooks/useUser";

const PlanItem = ({ placeId, placeName, ...plan }) => {
  const navigation = useNavigation();

  const comesFromSite = placeId != null && placeName != null;
  const { addSiteGoogle } = hooksPlan();
  const { userToken } = useUser();

  const addSiteToPlan = (planId) => {
    addSiteGoogle(userToken, planId, placeId, placeName);
    navigation.goBack();
  };

  const places = [];

  for (let i = 0; i < plan.places?.length; i++) {
    places.push(
      plan.places[i].placeName + (i !== plan.places.length - 1 ? ", " : ". ")
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.plans}
        onPress={() =>
          comesFromSite
            ? addSiteToPlan(plan.id)
            : navigation.navigate("Plan", { plan })
        }
      >
        <StyledText fontSize="title" fontWeight="bold">
          {plan.name}
        </StyledText>
        {plan.description && (
          <StyledText fontSize="body" numberOfLines={3} ellipsizeMode="tail">
            {plan.description}
          </StyledText>
        )}
        <StyledText fontSize="subheading" color="secondary">
          {plan?.places?.length || "0"} Sitio{plan?.places?.length != 1 && "s"}
        </StyledText>
        {places.length != 0 && (
          <StyledText fontSize="body" numberOfLines={2} ellipsizeMode="tail">
            {places}
          </StyledText>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexGrow: 1,
  },
  plans: {
    padding: 8,
    paddingVertical: 1,
    flexShrink: 1,
  },
  deleteButton: {
    justifyContent: "center",
  },
});

export default PlanItem;
