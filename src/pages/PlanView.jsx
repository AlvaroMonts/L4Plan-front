import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import SiteList from "../components/sites/SiteList";
import StyledText from "../components/styledComponents/StyledText";
import { hooksPlan } from "../services/PlanService";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hooks/useUser";
import Ionicons from "@expo/vector-icons/Ionicons";
import FormikInputValue from "../components/styledComponents/FormikInputValue";
import { Formik } from "formik";
import { planValidationSchema } from "../schemas/plan";

const PlanView = ({ route }) => {
  const { plan } = route.params;

  const isUpdate = plan != undefined;

  const { userToken, userInfo } = useUser();
  const navigation = useNavigation();

  const { create, deletePlan, updatePlan } = hooksPlan();

  const initialValues = {
    name: plan?.name || "",
    description: plan?.description || "",
  };

  const handleSave = (values) => {
    const { name, description } = values;
    if (isUpdate) {
      updatePlan(userToken, plan.id, name, description, userInfo.id);
      navigation.goBack();
    } else {
      create(userToken, name, description, userInfo.id);
      navigation.goBack();
    }
  };

  const handleDelete = () => {
    deletePlan(userToken, plan.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={planValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSave}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <StyledText color="secondary" fontSize="subheading">
              Nombre
            </StyledText>
            <FormikInputValue
              style={styles.input}
              name="name"
              value={values.name}
              onChangeText={handleChange("name")}
              placeholder="Nombre"
              error={touched.name && errors.name}
            />
            <StyledText color="secondary" fontSize="subheading">
              Descripción
            </StyledText>
            <FormikInputValue
              style={styles.input}
              name="description"
              value={values.description}
              onChangeText={handleChange("description")}
              placeholder="Descripción"
              multiline
              error={touched.description && errors.description}
            />
            {isUpdate && (
              <View style={styles.sitesContainer}>
                <View style={styles.sitesRow}>
                  <StyledText
                    fontSize="heading"
                    color="secondary"
                    style={styles.sitesHeader}
                  >
                    {plan?.places?.length || "0"} Sitio
                    {plan?.places?.length > 1 && "s"}
                  </StyledText>
                </View>
                <View style={styles.separator1} />
                <SiteList plan={plan} places={plan.places} />
                <View style={styles.separator2} />
              </View>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit}
              >
                <StyledText color="general" fontSize="subheading">
                  {isUpdate ? "Guardar" : "Crear"}
                </StyledText>
              </TouchableOpacity>
              {isUpdate && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDelete}
                >
                  <Ionicons name={"trash-outline"} size={30} color="#eee" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  form: {
    flex: 1,
  },
  input: {
    fontSize: 16,
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  separator1: {
    height: 3,
    backgroundColor: "#ccc",
    marginBottom: 2,
  },
  separator2: {
    height: 3,
    backgroundColor: "#ccc",
    marginBottom: 16,
  },
  sitesHeader: {
    padding: 5,
  },
  saveButton: {
    padding: 8,
    backgroundColor: "#006699",
    borderRadius: 4,
    justifyContent: "center",
  },
  deleteButton: {
    padding: 8,
    backgroundColor: "red",
    borderRadius: 4,
  },
  sitesContainer: {
    flex: 1,
  },
  sitesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PlanView;
