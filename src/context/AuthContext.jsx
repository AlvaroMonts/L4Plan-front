import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../services/config";
import { set } from "react-native-reanimated";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [requireRefresh, setRequireRefresh] = useState(false);

  // AsyncStorage.clear();
  const login = (email, password) => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    setError(null);
    axios
      .post(BASE_URL + "/auth/authenticate", {
        email,
        password,
      })
      .then((res) => {
        let token = JSON.stringify(res.data.token);
        let userInfo = JSON.stringify(res.data.userDTO);
        console.log("Authentication successful. Storing user: " + userInfo);
        setUserInfo(userInfo);
        setUserToken(token);
        AsyncStorage.setItem("userToken", token);
        AsyncStorage.setItem("userInfo", userInfo);
        setLoggedIn(true);
      })
      .catch((error) => {
        if (error.response) {
          setError("El correo y/o la contraseña son incorrectas");
          console.log(error.response.data);
        } else if (error.request) {
          setError(error.request);
          console.log(error.request);
        } else {
          setError(error.message);
          console.log(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userInfo");
    setLoggedIn(false);
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInformation = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInformation = JSON.parse(userInformation);
      if (userInformation) {
        setUserToken(userToken);
        setUserInfo(userInformation);
        setLoggedIn(true);
      }
      setIsLoading(false);
    } catch (e) {
      setError(e);
      console.log("isLoggedIn error: " + e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, [loggedIn]);

  useEffect(() => {
    isLoggedIn();

    if (requireRefresh) {
      refresh();
      setRequireRefresh(false);
    }
  }, [requireRefresh]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        userToken,
        userInfo,
        error,
        requireRefresh,
        loggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
