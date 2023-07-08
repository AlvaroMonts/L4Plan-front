import React from "react";
import { StyleSheet, View, Button, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import { registerValidationSchema } from "../schemas/register";
import FormikInputValue from "../components/styledComponents/FormikInputValue";
import StyledText from "../components/styledComponents/StyledText";
import { hooksUser } from "../services/UserService";
import FormikSecureInputValue from "../components/styledComponents/FormikSecureInputValue";

const initialValues = {
  email: "",
  name: "",
  password: "",
  passwordConfirmation: "",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    padding: 10,
    alignItems: "center",
  },
  formikContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  form: {
    margin: 12,
  },
  button: {
    paddingTop: 50,
  },
  error: {
    color: "red",
    textAlign: "center",
    padding: 10,
  },
  success: {
    color: "green",
    textAlign: "center",
    padding: 10,
  },
});

const Register = () => {
  const { data, error, isLoading, registerUser } = hooksUser();

  const register = (values) => {
    registerUser(values.email, values.name, values.password);
  };

  return (
    <View style={styles.container}>
      <StyledText fontSize="title" fontWeight="bold" style={styles.header}>
        Registra tu usuario
      </StyledText>
      <Formik
        validationSchema={registerValidationSchema}
        style={styles.formikContainer}
        initialValues={initialValues}
        onSubmit={(values) => register(values)}
      >
        {({ handleChange, handleSubmit, values }) => {
          return (
            <View style={styles.form}>
              <FormikInputValue name="email" placeholder="E-mail" />
              <FormikInputValue name="name" placeholder="Nombre" />
              <FormikSecureInputValue
                name="password"
                placeholder="Contraseña"
              />
              <FormikSecureInputValue
                name="passwordConfirmation"
                placeholder="Repetir la contraseña"
              />
              <Button
                style={styles.button}
                onPress={handleSubmit}
                title={isLoading ? "Registrando usuario" : "Registrarse"}
                disabled={isLoading}
              ></Button>
            </View>
          );
        }}
      </Formik>
      {data && !error && !isLoading && (
        <StyledText style={styles.success}>{data}</StyledText>
      )}
      {isLoading && !data && !error && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      {error && !data && !isLoading && (
        <StyledText style={styles.error}>{error}</StyledText>
      )}
    </View>
  );
};

export default Register;
