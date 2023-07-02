import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { Formik } from "formik";
import { changePasswordValidationSchema } from "../schemas/changePassword";
import FormikInputValue from "../components/styledComponents/FormikInputValue";
import StyledText from "../components/styledComponents/StyledText";
import { hooksUser } from "../services/UserService";

const initialValues = {
  email: "",
};

const ChangePass = () => {
  const { data, error, isLoading, changePassNotLogged } = hooksUser();

  return (
    <View style={styles.container}>
      <StyledText fontSize="heading" fontWeight="bold" style={styles.header}>
        Recupera la contraseña de tu usuario
      </StyledText>
      <Formik
        validationSchema={changePasswordValidationSchema}
        style={styles.container}
        initialValues={initialValues}
        onSubmit={(values) => changePassNotLogged(values.email)}
      >
        {({ handleChange, handleSubmit, values }) => {
          return (
            <View style={styles.form}>
              <FormikInputValue name="email" placeholder="E-mail" />
              <Button
                onPress={handleSubmit}
                title={
                  isLoading
                    ? "Generando contraseña..."
                    : "Genera una nueva contraseña"
                }
                disabled={isLoading}
              ></Button>
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
  formikContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  form: {
    margin: 12,
  },
});

export default ChangePass;
