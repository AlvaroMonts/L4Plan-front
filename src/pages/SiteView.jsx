import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../components/styledComponents/StyledText";
import { hooksPlan } from "../services/PlanService";
import { useUser } from "../hooks/useUser";

const SiteView = ({ route }) => {
  const navigation = useNavigation();
  const { site, plan, position } = route.params;
  const { removeSite } = hooksPlan();
  const { userToken } = useUser();

  const comesFromPlan = plan != null;

  const defaultImage = require("../../assets/no-image.jpg");

  const handleDeleteFromPlan = (siteId) => {
    removeSite(userToken, plan.id, siteId, position);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          defaultSource={defaultImage}
          source={site?.photo ? { uri: site.photo } : defaultImage}
          // source={defaultImage}
          style={styles.image}
        />
        <StyledText style={styles.name}>{site.name}</StyledText>
        <StyledText style={styles.description}>{site.description}</StyledText>
        <StyledText style={styles.address}>
          {site.address}. {site.city}, {site.country}
        </StyledText>
        <StyledText style={styles.additionalData}>
          Latitude: {site.latitude}
        </StyledText>
        <StyledText style={styles.additionalData}>
          Longitude: {site.longitude}
        </StyledText>
        <StyledText style={styles.additionalData}>REVIEWS????</StyledText>
      </ScrollView>
      <View style={styles.buttons}>
        {comesFromPlan ? (
          <TouchableOpacity
            style={styles.buttonDelete}
            onPress={() => handleDeleteFromPlan(site.id)}
          >
            <StyledText fontSize="subheading" fontWeight="bold" color="error">
              Quitar del plan {plan.name}
            </StyledText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Elige el Plan", { siteId: site.id })
            }
          >
            <StyledText fontSize="subheading" fontWeight="bold" color="general">
              Añadir a un plan
            </StyledText>
          </TouchableOpacity>
        )}

        {!comesFromPlan && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Mapa", { site })}
          >
            <StyledText fontSize="subheading" fontWeight="bold" color="general">
              Ver en el Mapa
            </StyledText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  image: {
    width:"100%",
    height:280,
    marginVertical: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  address: {
    fontSize: 14,
    marginBottom: 10,
    color: "#555555",
  },
  additionalData: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555555",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#006699",
  },
});

export default SiteView;
