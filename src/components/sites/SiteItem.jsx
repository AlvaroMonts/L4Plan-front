import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import SiteMain from "./SiteMain";
import SiteBody from "./SiteBody";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { hooksPlan } from "../../services/PlanService";
import { useUser } from "../../hooks/useUser";
import { hooksGoogleMapSites } from "../../services/GoogleMapsService";
import StyledText from "../styledComponents/StyledText";
import { API_KEY } from "../../services/config";

const SiteItem = ({ plan, position, placeId }) => {
  const navigation = useNavigation();

  const [place, setPlace] = useState(null);
  const [placePhoto, setPlacePhoto] = useState(null);

  const { removeSiteGoogle } = hooksPlan();
  const { userToken } = useUser();
  const { data, error, isLoading, getSiteDetailsById } = hooksGoogleMapSites();

  useEffect(() => {
    getSiteDetailsById(placeId, userToken);
  }, []);

  useEffect(() => {
    if (data) {
      setPlace(data);
      const photo =
        data?.photos?.length > 0 && data?.photos[0].photo_reference != null
          ? data.photos[0].photo_reference
          : null;
      setPlacePhoto(
        photo
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=56&photoreference=${photo}&key=${API_KEY}`
          : null
      );
    }
  }, [data]);

  const handleDeleteFromPlan = (position) => {
    removeSiteGoogle(userToken, plan.id, position);
    // tries to refresh in plan view
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.siteContainer}>
          <StyledText>
            Error cargando el sitio previamente añadido: {error}
          </StyledText>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteFromPlan(position)}
        >
          <Ionicons name={"trash-outline"} size={20} color={"black"} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.siteContainer}>
        {place && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Sitio", { details: place, plan })
            }
          >
            <SiteMain
              position={position}
              photo={placePhoto}
              name={place.name}
              rating={place.rating}
            />
            <SiteBody
              address={place.formatted_address}
              description={place.editorial_summary.overview}
            />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteFromPlan(position)}
      >
        <Ionicons name="trash-outline" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  siteContainer: {
    flex: 1,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 4,
  },
});

export default SiteItem;
