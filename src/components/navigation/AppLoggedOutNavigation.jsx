import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ChangePass from "../../pages/ChangePass";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createMaterialBottomTabNavigator();

export default function AppLoggedOutNavigation() {
  return (
    <Tab.Navigator
    //  activeColor="#f0edf6"
    // inactiveColor="#3e2465"
    // barStyle={{ backgroundColor: "#694fad" }}
    >
      <Tab.Screen
        component={Login}
        name="Iniciar Sesión"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="log-in-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Registrarse"
        component={Register}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-add-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Recuperar Contraseña"
        component={ChangePass}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="mail-outline" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
