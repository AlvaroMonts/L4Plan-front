import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map from "../../pages/Map";
import Sites from "../../pages/Sites";
import SiteView from "../../pages/SiteView";
import SiteSearch from "../sites/SiteSearch";
import Plans from "../../pages/Plans";
import PlanView from "../../pages/PlanView";
import User from "../../pages/User";
import CustomDrawer from "./CustomDrawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import SelectPlan from "../../pages/SelectPlan";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const PlanStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyPlans"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={Plans} name="MyPlans" />
      <Stack.Screen component={PlanView} name="Plan" />
      <Stack.Screen component={SiteView} name="Sitio" />
      <Stack.Screen component={SiteSearch} name="Buscar Sitios" />
      <Stack.Screen component={Map} name="Mapa" />
    </Stack.Navigator>
  );
};

const SiteStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Sites"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={Sites} name="Sites" />
      <Stack.Screen component={SiteView} name="Sitio" />
      <Stack.Screen component={SelectPlan} name="Elige el Plan" />
      <Stack.Screen component={PlanView} name="Plan" />
      <Stack.Screen component={Map} name="Mapa" />
    </Stack.Navigator>
  );
};

const MapStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Map"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={Map} name="Map" />
      <Stack.Screen component={SiteView} name="Sitio" />
    </Stack.Navigator>
  );
};

const AppLoggedInNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      // backBehavior="history"
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
        component={SiteStack}
        name="Sitios"
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "locate" : "locate-outline"}
              size={30}
              color={focused ? "#8200d6" : "gray"}
            />
          ),
          drawerLabelStyle: {
            fontSize: 20,
          },
        }}
      />
      <Drawer.Screen
        component={MapStack}
        name="Mapa"
        options={{
          drawerIcon: ({ focused, size }) => (
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
        component={PlanStack}
        name="Tus Planes"
        options={{
          drawerIcon: ({ focused, size }) => (
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
          drawerIcon: ({ focused, size }) => (
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

export default AppLoggedInNavigation;
