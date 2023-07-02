import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../components/styledComponents/StyledText";
import PlanList from "../components/plans/PlanList";
import filter from "lodash.filter";
import customAutoHookWithToken from "../hooks/customAutoHookWithToken";
import { useUser } from "../hooks/useUser";
import Ionicons from "@expo/vector-icons/Ionicons";

const Plans = ({ placeId, placeName }) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [filteredPlans, setFilteredPlans] = useState([]);

  const { userInfo, userToken } = useUser();
  const { data, loading, error, refetch } = customAutoHookWithToken(
    "/plan/user/" + userInfo.id,
    "get",
    userToken
  );

  useEffect(() => {
    if (data) {
      setFilteredPlans(data);
    }
  }, [data]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredData = filter(data, (plan) => {
      return contains(plan, text);
    });
    setFilteredPlans(filteredData);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setFilteredPlans(data);
  };

  const contains = ({ name, description, places }, text) => {
    const lowerText = text.toLowerCase();

    return (
      name.toLowerCase().includes(lowerText) ||
      description?.toLowerCase().includes(lowerText) ||
      places?.some((place) => place.placeName.toLowerCase().includes(lowerText))
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchIconContainer}>
          <Ionicons name="search-outline" size={20} color="#ccc" />
        </View>
        <TextInput
          style={styles.searchBox}
          placeholder="Buscar"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchText}
          onChangeText={(query) => handleSearch(query)}
        />
        {searchText !== "" && (
          <TouchableOpacity onPress={handleClearSearch}>
            <Ionicons name="close-circle" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>

      {error && <StyledText>{error}</StyledText>}
      {!loading && data && data.length === 0 && (
        <View style={styles.noSites}>
          <StyledText fontWeight="light">
            Aun no tienes ningún plan! Crea uno y añade sitios
          </StyledText>
        </View>
      )}
      {!error && (
        <PlanList
          data={filteredPlans}
          placeId={placeId}
          placeName={placeName}
          refetch={refetch}
          loading={loading}
        />
      )}

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("Plan", {})}
      >
        <StyledText fontSize="subheading" fontWeight="bold" color="general">
          Crear Plan Nuevo
        </StyledText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  searchBox: {
    flex: 1,
  },
  createButton: {
    backgroundColor: "#006699",
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 35,
    marginBottom: 15,
    alignItems: "center",
  },
  searchIconContainer: {
    marginRight: 10,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
  noSites: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Plans;
