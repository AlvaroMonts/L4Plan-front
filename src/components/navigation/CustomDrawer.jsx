import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useUser } from "../../hooks/useUser";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyledText from "../styledComponents/StyledText";
import { useNavigation } from "@react-navigation/native";
import ChangePass from "../../pages/ChangePass";

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { userInfo, logout } = useUser();
  /* const [localUserInfo, setLocalUserInfo] = useState(userInfo);

  useEffect(() => {
    const updateLocalUserInfo = (newUserInfo) => {
      setLocalUserInfo(newUserInfo);
    };

    const unsubscribe = () => {
      userInfo.onUpdate(updateLocalUserInfo);
    };

    return () => unsubscribe();
  }, []);
 */

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
        },
        {
          text: "Confirmar",
          onPress: () => {
            logout();
          },
        },
      ]
    );

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          source={require("../../../assets/bg.jpg")}
          style={styles.imageBackground}
        >
          <Image
            source={require("../../../assets/profile.png")}
            style={styles.profileImage}
          />
          <StyledText style={styles.usernameText}>
            Hola {userInfo.firstName}
          </StyledText>
          <StyledText style={styles.emailText}>{userInfo.email}</StyledText>
        </ImageBackground>

        <View style={styles.drawerItemListContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("Cambia la contraseña")}
        style={styles.changePass}
      >
        <Ionicons name="lock-closed-outline" size={32} color="black" />
        <StyledText style={styles.changePassText}>
          Cambiar Contraseña
        </StyledText>
      </TouchableOpacity>
      <TouchableOpacity onPress={createTwoButtonAlert} style={styles.logout}>
        <Ionicons name="log-out-outline" size={28} color="black" />
        <StyledText style={styles.logoutText}>Cerrar Sesión</StyledText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    flex: 1,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  usernameText: {
    color: "#fff",
    fontSize: 25,
  },
  emailText: {
    color: "#ccc",
    fontSize: 16,
  },
  drawerItemListContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  changePass: {
    marginHorizontal: 5,
    paddingHorizontal: 9,
    paddingVertical: 12,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "black",
  },
  changePassText: {
    marginLeft: 5,
    padding: 7.5,
  },
  logout: {
    marginHorizontal: 5,
    padding: 12,
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderColor: "#ccc",
  },
  logoutText: {
    marginLeft: 5,
    padding: 7.5,
  },
});

export default CustomDrawer;
