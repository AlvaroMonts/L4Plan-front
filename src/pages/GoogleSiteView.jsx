import React from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../components/styledComponents/StyledText";
import { hooksPlan } from "../services/PlanService";
import { useUser } from "../hooks/useUser";
import ImageSlider from "../components/sites/ImageSlider";
import { API_KEY } from "../services/config";
import RatingItem from "../components/styledComponents/RatingItem";
import LinkText from "../components/styledComponents/LinkText";

const GoogleSiteView = ({ route }) => {
  const navigation = useNavigation();
  const { details, plan, position } = route.params;

  const { removeSiteGoogle } = hooksPlan();
  const { userToken } = useUser();

  const comesFromPlan = plan != null;

  const handleDeleteFromPlan = () => {
    removeSiteGoogle(userToken, plan.id, position);
    navigation.goBack();
  };

  const photos = [];

  details?.photos.map((photo) => {
    photos.push(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=350&photoreference=${photo.photo_reference}&key=${API_KEY}`
    );
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageSlider style={styles.images} images={photos} />
        <StyledText style={styles.description}>
          {details?.editorial_summary?.overview}
        </StyledText>

        {details?.current_opening_hours?.open_now !== undefined && (
          <StyledText
            style={styles.normalText}
            fontSize="subheading"
            fontWeight="bold"
          >
            {details.current_opening_hours.open_now
              ? "🟢 Abierto"
              : "🔴 Cerrado"}
          </StyledText>
        )}

        {details?.rating && (
          <StyledText style={styles.normalText}>
            <RatingItem rating={details.rating} />
            {details.rating}/5
          </StyledText>
        )}

        <StyledText style={styles.normalText}>
          {details?.formatted_address}
        </StyledText>

        {details?.website && (
          <StyledText style={styles.normalText}>
            Página web:{" "}
            <LinkText url={details.website} text={details.website} />
          </StyledText>
        )}

        {details?.current_opening_hours?.weekday_text && (
          <StyledText style={styles.normalText}>
            Horario:{"\n"}
            {details.current_opening_hours.weekday_text.map(
              (schedule, index) => (
                <StyledText key={index}>
                  {schedule}
                  {"\n"}
                </StyledText>
              )
            )}
          </StyledText>
        )}

        {details?.international_phone_number && (
          <StyledText style={styles.normalText}>
            Teléfono: {details.international_phone_number}
          </StyledText>
        )}
      </ScrollView>

      {comesFromPlan ? (
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.buttonDelete}
            onPress={() => handleDeleteFromPlan()}
          >
            <StyledText fontSize="subheading" fontWeight="bold" color="error">
              Quitar del plan {plan.name}
            </StyledText>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log(
                "details?.place_id",
                details?.place_id,
                "details?.name",
                details?.name
              );
              navigation.navigate("Elige el Plan", {
                placeId: details?.place_id,
                placeName: details?.name,
              });
            }}
          >
            <StyledText fontSize="subheading" fontWeight="bold" color="general">
              Añadir a un plan
            </StyledText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  normalText: {
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
  images: {
    width: 350,
    height: 250,
    marginBottom: 10,
    borderRadius: 15,
  },
});

export default GoogleSiteView;
