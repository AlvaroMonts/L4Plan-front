import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import AppLoggedInNavigation from "./AppLoggedInNavigation";
import { NavigationContainer } from "@react-navigation/native";
import AppLoggedOutNavigation from "./AppLoggedOutNavigation";
import { useUser } from "../../hooks/useUser";

const InitialNav = () => {
  const { isLoading, loggedIn } = useUser();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {loggedIn ? <AppLoggedInNavigation /> : <AppLoggedOutNavigation />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InitialNav;
