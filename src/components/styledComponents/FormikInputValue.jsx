import React from "react";
import { StyleSheet } from "react-native";
import { useField } from "formik";
import StyledTextInput from "./StyledTextInput";
import StyledText from "./StyledText";

const FormikInputValue = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  return (
    <>
      <StyledTextInput
        error={meta.error}
        value={field.value}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={handleBlur}
        {...props}
      />
      {meta.touched && meta.error && (
        <StyledText style={styles.error}>{meta.error}</StyledText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 20,
    marginTop: -10,
  },
});

export default FormikInputValue;
