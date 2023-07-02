import { useState } from "react";
import { BASE_URL } from "../services/config";
import axios from "axios";

export const hooksUser = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = (token, id, firstName, lastName, gender, birthDate) => {
    setIsLoading(true);
    setData(null);
    setError(null);
    let finalUrl = BASE_URL + "/user/data/" + id;

    const yourConfig = {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    };

    axios
      .put(finalUrl, { firstName, lastName, gender, birthDate }, yourConfig)
      .then()
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  const registerUser = async (email, firstName, pass) => {
    setIsLoading(true);
    setData(null);
    setError(null);
    let finalUrl = BASE_URL + "/user/register";

    axios
      .post(finalUrl, { firstName, email, pass })
      .then((res) => {
        if (res.status == 201) {
          setError(null);
          setData("Se ha registrado exitosamente");
        } else {
          console.log("error por status", res.status);
          setData(null);
          setError(
            "Error desconocido, pongase en contacto con el administrador"
          );
        }
      })
      .catch((error) => {
        setData(null);
        if (error.response) {
          console.log(
            error.response.status,
            error.response.data,
            error.message
          );
          setError(error.response.data);
        } else if (error.request) {
          console.log(error.request);
          setError(error.request);
        } else {
          console.log(error.message);
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const changePassNotLogged = (email) => {
    setIsLoading(true);
    setData(null);
    setError(null);
    let finalUrl = BASE_URL + "/user/change-psw";

    axios
      .post(finalUrl, { email })
      .then((res) => {
        setError(null);
        setData(res.data);
      })
      .catch((error) => {
        setData(null);
        if (error.response) {
          console.log(
            error.response.status,
            error.response.data,
            error.message
          );
          setError(error.response.data);
        } else if (error.request) {
          console.log(error.request);
          setError(error.request);
        } else {
          console.log(error.message);
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const changePassLogged = (token, userId, oldPassword, newPassword) => {
    setIsLoading(true);
    setData(null);
    setError(null);
    let finalUrl = BASE_URL + "/user/change-psw-logged/" + userId;

    const yourConfig = {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    };

    axios
      .put(finalUrl, { oldPassword, newPassword }, yourConfig)
      .then((res) => {
        console.log(
          res.status,
          "Se ha cambiado la contraseña"
          /*, res.config.data*/
        );
        setError(null);
        setData("Se ha cambiado la contraseña existosamente");
      })
      .catch((error) => {
        setData(null);
        if (error.response) {
          console.log(
            error.response.status,
            error.response.data,
            error.message
          );
          setError(error.response.data);
        } else if (error.request) {
          console.log(error.request);
          setError(error.request);
        } else {
          console.log(error.message);
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const deleteUser = (id) => {
    setIsLoading(true);
    setData(null);
    setError(null);
    let finalUrl = BASE_URL + "/user/" + id;

    axios
      .put(finalUrl)
      .then((res) => {
        setError(null);
        setData(res.data);
      })
      .catch((error) => {
        setData(null);
        if (error.response) {
          console.log(
            error.response.status,
            error.response.data,
            error.message
          );
          setError(error.response.data);
        } else if (error.request) {
          console.log(error.request);
          setError(error.request);
        } else {
          console.log(error.message);
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return {
    data,
    isLoading,
    error,
    update,
    registerUser,
    changePassNotLogged,
    changePassLogged,
    deleteUser,
  };
};
