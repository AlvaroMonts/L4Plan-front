import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import StyledText from "../components/styledComponents/StyledText";
import { useUser } from "../hooks/useUser";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { hooksUser } from "../services/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import FormikInputValue from "../components/styledComponents/FormikInputValue";
import userUpdateValidationSchema from "../schemas/userUpdate";

const User = () => {
  const { userInfo, userToken } = useUser();
  const [editable, setEditable] = useState(false);
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [gender, setGender] = useState(userInfo.gender);
  const [birthDate, setBirthDate] = useState(userInfo.birthDate);
  const [tempUserInfo, setTempUserInfo] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { error, isLoading, update } = hooksUser();

  const handleEdit = () => {
    setTempUserInfo({ firstName, lastName, gender, birthDate });
    setEditable(true);
  };

  const handleCancel = () => {
    setFirstName(tempUserInfo.firstName);
    setLastName(tempUserInfo.lastName);
    setGender(tempUserInfo.gender);
    setBirthDate(tempUserInfo.birthDate);
    setShowDatePicker(false);
    setEditable(false);
  };

  const handleSave = () => {
    setTempUserInfo({ firstName, lastName, gender, birthDate });
    setEditable(false);
    update(userToken, userInfo.id, firstName, lastName, gender, birthDate);

    const updatedUserInfo = {
      ...userInfo,
      firstName,
      lastName,
      gender,
      birthDate,
    };
    AsyncStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
  };

  const genderOptions = [
    { label: "Masculino", value: "M" },
    { label: "Femenino", value: "F" },
    { label: "Prefiero no especificar", value: null },
  ];

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    setBirthDate(`${year}-${month}-${day}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (!editable) {
              handleEdit();
            } else {
              handleCancel();
            }
          }}
        >
          <StyledText fontSize="subheading" fontWeight="bold" color="general">
            {editable ? "Cancelar" : "Editar"}
          </StyledText>
        </TouchableOpacity>

        <Formik
          validationSchema={userUpdateValidationSchema}
          style={styles.formContainer}
          onSubmit={() => handleSave()}
          initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            gender: null,
            dateBirth: new Date(),
          }}
        >
          {({ handleChange, handleSubmit, values }) => {
            return (
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <StyledText style={styles.textHead} fontSize="body">
                    Email:
                  </StyledText>
                  <FormikInputValue
                    name="email"
                    placeholder="Correo Electrónico"
                    style={styles.input}
                    value={userInfo.email}
                    editable={false}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <StyledText style={styles.textHead} fontSize="body">
                    Nombre:
                  </StyledText>
                  <FormikInputValue
                    name="firstName"
                    placeholder="Nombre"
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    editable={editable}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <StyledText style={styles.textHead} fontSize="body">
                    Apellido:
                  </StyledText>
                  <FormikInputValue
                    name="lastName"
                    placeholder="Apellidos"
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    editable={editable}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <StyledText style={styles.textHead} fontSize="body">
                    Género:
                  </StyledText>
                  <Picker
                    name="gender"
                    style={styles.picker}
                    selectedValue={gender}
                    onValueChange={(value) => setGender(value)}
                    enabled={editable}
                  >
                    {genderOptions.map((option) => (
                      <Picker.Item
                        key={option.value}
                        label={option.label}
                        value={option.value}
                      />
                    ))}
                  </Picker>
                </View>

                <View style={styles.inputContainer}>
                  <StyledText style={styles.textHead} fontSize="body">
                    Fecha de nacimiento:
                  </StyledText>

                  <TouchableOpacity
                    onPress={() => {
                      if (editable) {
                        setShowDatePicker(true);
                      }
                    }}
                  >
                    <TextInput
                      name="dateBirth"
                      style={styles.input}
                      value={birthDate}
                      //onChangeText={setBirthDate}
                      editable={false}
                    />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={birthDate ? new Date(birthDate) : new Date()}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                    />
                  )}
                </View>

                {editable && (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={handleSubmit}
                    >
                      <StyledText
                        fontSize="subheading"
                        fontWeight="bold"
                        color="general"
                      >
                        Guardar
                      </StyledText>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
        </Formik>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <StyledText style={styles.error}>{error}</StyledText>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  scrollContainer: {
    flex: 1,
    width: "80%",
  },
  editButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#006699",
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 5,
  },
  saveButton: {
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#006699",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    fontSize: 16,
  },
  textHead: {
    padding: 8,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default User;
