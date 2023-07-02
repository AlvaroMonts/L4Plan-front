import * as yup from "yup";

export const changePasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("El email es obligatorio"),
});
