import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import SitePinView from "../components/maps/SitePinView";
import { useNavigation } from "@react-navigation/native";
import { API_KEY } from "../services/config";
import Ionicons from "@expo/vector-icons/Ionicons";

// distance from 'air' to be charged when region is charged
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

const Map = () => {
  const navigation = useNavigation();

  // Madrid default region to view
  const defaultRegion = {
    latitude: 40.41617505408232,
    longitude: -3.704585011098903,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  };

  // user current location
  const [userCoords, setUserCoords] = useState(null);
  // coordinates of site searched
  const [siteSearched, setSiteSearched] = useState(null);
  // data collected from search
  const [detailsSite, setDetailsSite] = useState(null);
  const [placePhotoUrl, setPlacePhotoUrl] = useState(null);

  const [searchText, setSearchText] = useState("");
  // current region being displayed
  const [loadedRegion, setLoadedRegion] = useState(defaultRegion);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const getUserLocation = async () => {
    let status = await Location.requestForegroundPermissionsAsync();
    if (!status.granted) {
      Alert.alert("Permiso denegado!");
      return;
    }

    let userLocation = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    setUserCoords({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
    });

    setLoadedRegion(userCoords);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Buscar"
        minLength={3}
        autoFocus={false}
        fetchDetails={true}
        returnKeyType={"default"}
        textInputProps={{
          value: searchText,
          onChangeText: handleSearchTextChange,
        }}
        renderLeftButton={() => (
          <View style={styles.searchIcon}>
            <Ionicons name="search" size={20} color="#ccc" />
          </View>
        )}
        renderRightButton={() => (
          <TouchableOpacity
            onPress={() => setSearchText("")}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
        onPress={(data, details = null) => {
          const selectedRegion = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta,
            longitudeDelta,
          };
          const pinPhoto =
            details?.photos?.length > 0 &&
            details.photos[0].photo_reference != null
              ? details.photos[0].photo_reference
              : null;
          setSearchText(details.name);
          setPlacePhotoUrl(
            pinPhoto
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=56&photoreference=${pinPhoto}&key=${API_KEY}`
              : null
          );
          setDetailsSite(details);
          setLoadedRegion(selectedRegion);
          setSiteSearched(selectedRegion);
        }}
        query={{
          key: API_KEY,
          language: "es",
          components: "country:es",
          type: [
            "bakery",
            "restaurant",
            "store",
            "cafe",
            "point_of_interest",
            "food",
            "establishment",
            "museum",
            "tourist_attraction",
          ],
          rankby: "distance",
          location: userCoords
            ? `${userCoords?.latitude}, ${userCoords?.longitude}`
            : `${loadedRegion?.latitude}, ${loadedRegion?.longitude}`,
        }}
        styles={{
          container: {
            flex: 0,
            position: "absolute",
            width: "100%",
            zIndex: 1,
            paddingTop: 10,
            paddingHorizontal: 20,
          },
          listView: {
            backgroundColor: "white",
          },
          textInput: {
            color: "#5d5d5d",
            fontSize: 16,
            borderRadius: 25,
            paddingHorizontal: 40,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
      />
      <MapView style={styles.map} region={loadedRegion} provider="google">
        {siteSearched && (
          <Marker
            coordinate={{
              latitude: siteSearched?.latitude,
              longitude: siteSearched?.longitude,
            }}
          >
            <Callout
              style={styles.callout}
              onPress={() =>
                navigation.navigate("Sitio", {
                  details: detailsSite,
                  plan: null,
                })
              }
            >
              <SitePinView details={detailsSite} photo={placePhotoUrl} />
            </Callout>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  callout: {
    width: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  searchIcon: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    top: -3,
    width: 40,
  },
});

export default Map;
