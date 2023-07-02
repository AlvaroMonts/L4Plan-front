import React from "react";
import { StyleSheet, Text } from "react-native";
import theme from "../styles/theme.js";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorAdditional: {
    color: theme.colors.textAdditional,
  },
  colorSecondary: {
    color: theme.colors.textSecondary,
  },
  colorGeneral: {
    color: theme.colors.textGeneral,
  },
  colorError: {
    color: theme.colors.textError,
  },
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
  light: {
    fontWeight: theme.fontWeights.light,
  },
  subheading: {
    fontSize: theme.fontSizes.subheading,
  },
  heading: {
    fontSize: theme.fontSizes.heading,
  },
  title: {
    fontSize: theme.fontSizes.title,
  },
  body: {
    fontSize: theme.fontSizes.body,
  },
});

export default function StyledText({
  children,
  color,
  fontSize,
  fontWeight,
  style,
  ...restOfProps
}) {
  const textStyles = [
    styles.text,
    style,
    color == "primary" && styles.colorPrimary,
    color == "secondary" && styles.colorSecondary,
    color == "additional" && styles.textAdditional,
    color == "general" && styles.colorGeneral,
    color == "error" && styles.colorError,
    fontSize == "body" && styles.body,
    fontSize == "heading" && styles.heading,
    fontSize == "subheading" && styles.subheading,
    fontSize == "title" && styles.title,
    fontWeight == "light" && styles.light,
    fontWeight == "bold" && styles.bold,
  ];

  return (
    <Text style={textStyles} {...restOfProps}>
      {children}
    </Text>
  );
}
