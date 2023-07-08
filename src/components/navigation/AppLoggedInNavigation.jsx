import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map from "../../pages/Map";
import Plans from "../../pages/Plans";
import PlanView from "../../pages/PlanView";
import User from "../../pages/User";
import GoogleSiteView from "../../pages/GoogleSiteView";
import CustomDrawer from "./CustomDrawer";
import SelectPlan from "../../pages/SelectPlan";
import ChangePassLogged from "../../pages/ChangePassLogged";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AppLoggedInNavigation = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      backBehavior="history"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: "black",
        },
      }}
    >
      <Drawer.Screen
        component={Map}
        name="Mapa"
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={30}
              color={focused ? "#8200d6" : "gray"}
            />
          ),
          drawerLabelStyle: {
            fontSize: 20,
          },
          drawerLabel: "Mapa",
        }}
      />
      <Drawer.Screen
        component={Plans}
        name="Tus Planes"
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "planet" : "planet-outline"}
              size={30}
              color={focused ? "#8200d6" : "gray"}
            />
          ),
          drawerLabelStyle: {
            fontSize: 20,
          },
          drawerLabel: "MyPlans",
        }}
      />
      <Drawer.Screen
        component={User}
        name="Tu Cuenta"
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Cambia la contraseña")}
              style={styles.changePass}
            >
              <Ionicons name="lock-closed-outline" size={32} color="black" />
            </TouchableOpacity>
          ),
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={30}
              color={focused ? "#8200d6" : "gray"}
            />
          ),
          drawerLabelStyle: {
            fontSize: 20,
          },
          drawerLabel: "Perfil",
        }}
      />
    </Drawer.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: "black",
        },
      }}
    >
      <Stack.Screen
        name="AppLoggedInNavigation"
        component={AppLoggedInNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen component={PlanView} name="Plan" />
      <Stack.Screen component={SelectPlan} name="Elige el Plan" />
      <Stack.Screen component={ChangePassLogged} name="Cambia la contraseña" />
      <Stack.Screen
        component={GoogleSiteView}
        name="Sitio"
        options={({ route }) => ({
          headerTitle: route.params.details.name,
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  changePass: {
    marginHorizontal: 5,
    paddingHorizontal: 9,
    paddingVertical: 12,
    borderColor: "black",
  },
});

export default MainNavigation;
