import React from "react";
import { StyleSheet, View, Button, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import StyledText from "../components/styledComponents/StyledText";
import { loginValidationSchema } from "../schemas/login";
import FormikInputValue from "../components/styledComponents/FormikInputValue";
import { useUser } from "../hooks/useUser";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { login, error, isLoading } = useUser();

  return (
    <View style={styles.container}>
      <StyledText fontSize="title" fontWeight="bold" style={styles.header}>
        Inicia Sesión con tu usuario
      </StyledText>
      <Formik
        validationSchema={loginValidationSchema}
        style={styles.formikContainer}
        initialValues={initialValues}
        onSubmit={(values) => login(values.email, values.password)}
      >
        {({ handleChange, handleSubmit, values }) => {
          return (
            <View style={styles.form}>
              <FormikInputValue
                name="email"
                placeholder="Correo electrónico"
                autoCapitalize="none"
              />
              <FormikInputValue
                name="password"
                placeholder="Contraseña"
                secureTextEntry
              />
              <Button
                onPress={handleSubmit}
                title={isLoading ? "Iniciando sesion..." : "Inicia Sesion"}
                disabled={isLoading}
              ></Button>
            </View>
          );
        }}
      </Formik>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <StyledText style={styles.error}>{error}</StyledText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  formikContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  form: {
    margin: 12,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
    padding: 10,
  },
  button: {
    paddingTop: 50,
  },
});

export default Login;
