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
          const [showPasswordOld, setShowPasswordOld] = useState(false);
          const [showPasswordNew, setShowPasswordNew] = useState(false);
          const [showPasswordConfirmation, setShowPasswordConfirmation] =
            useState(false);

          const toggleShowPasswordOld = () => {
            setShowPasswordOld(!showPasswordOld);
          };

          const toggleShowPasswordNew = () => {
            setShowPasswordNew(!showPasswordNew);
          };

          const toggleShowPasswordConfirmation = () => {
            setShowPasswordConfirmation(!showPasswordConfirmation);
          };

          return (
            <View style={styles.form}>
              <FormikSecureInputValue
                name="passwordOld"
                placeholder="Contraseña antigua"
                showPassword={showPasswordOld}
                toggleShowPassword={toggleShowPasswordOld}
              />
              <FormikSecureInputValue
                name="passwordNew"
                placeholder="Contraseña nueva"
                showPassword={showPasswordNew}
                toggleShowPassword={toggleShowPasswordNew}
              />
              <FormikSecureInputValue
                name="passwordConfirmation"
                placeholder="Repite la contraseña nueva"
                showPassword={showPasswordConfirmation}
                toggleShowPassword={toggleShowPasswordConfirmation}
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
