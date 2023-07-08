import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useField } from "formik";
import StyledTextInput from "./StyledTextInput";
import StyledText from "./StyledText";
import { Ionicons } from "@expo/vector-icons";

const FormikSecureInputValue = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  const toggleSecureTextEntry = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <View style={styles.container}>
        <StyledTextInput
          error={meta.error}
          value={field.value}
          onChangeText={helpers.setValue}
          onBlur={handleBlur}
          secureTextEntry={!showPassword}
          style={styles.textInput}
          {...props}
        />
        <Ionicons
          name={showPassword ? "eye" : "eye-off"}
          size={24}
          color="gray"
          style={styles.icon}
          onPress={toggleSecureTextEntry}
        />
      </View>
      {meta.touched && meta.error && (
        <StyledText style={styles.error}>{meta.error}</StyledText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  textInput: {
    flex: 1,
    paddingRight: 40,
  },
  icon: {
    position: "absolute",
    top: "42%",
    right: 10,
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginTop: -8,
  },
});

export default FormikSecureInputValue;
