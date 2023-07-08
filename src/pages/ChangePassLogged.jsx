import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { Formik } from "formik";
import { changePasswordLoggedValidationSchema } from "../schemas/changePasswordLogged";
import FormikSecureInputValue from "../components/styledComponents/FormikSecureInputValue";
import StyledText from "../components/styledComponents/StyledText";
import { hooksUser } from "../services/UserService";
import { useUser } from "../hooks/useUser";

const initialValues = {
  passwordOld: "",
  passwordNew: "",
  passwordConfirmation: "",
};

const ChangePassLogged = () => {
  const { userInfo, userToken } = useUser();
  const { data, error, isLoading, changePassLogged } = hooksUser();

  const handleChangePassLogged = (values) => {
    changePassLogged(
      userToken,
      userInfo.id,
      values.passwordOld,
      values.passwordNew
    );
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={changePasswordLoggedValidationSchema}
        style={styles.container}
        initialValues={initialValues}
        onSubmit={handleChangePassLogged}
      >
        {({ handleChange, handleSubmit, values, handleBlur }) => {
          return (
            <View style={styles.form}>
              <FormikSecureInputValue
                name="passwordOld"
                placeholder="Contraseña antigua"
              />
              <FormikSecureInputValue
                name="passwordNew"
                placeholder="Contraseña nueva"
              />
              <FormikSecureInputValue
                name="passwordConfirmation"
                placeholder="Repite la contraseña nueva"
              />
              <Button
                onPress={handleSubmit}
                title={
                  isLoading ? "Cambiando contraseña..." : "Cambiar contraseña"
                }
                disabled={isLoading}
              />
            </View>
          );
        }}
      </Formik>
      {data && !error && !isLoading && (
        <StyledText style={styles.success}>{data}</StyledText>
      )}
      {error && !data && !isLoading && (
        <StyledText style={styles.error}>{error}</StyledText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  form: {
    margin: 12,
  },
  success: {
    color: "green",
    paddingHorizontal: 12,
  },
  error: {
    color: "red",
    paddingHorizontal: 12,
  },
});

export default ChangePassLogged;
