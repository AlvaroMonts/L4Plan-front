import * as yup from "yup";

export const changePasswordLoggedValidationSchema = yup.object().shape({
  passwordOld: yup
    .string()
    .min(5, "Demasiado corta!")
    .max(30, "Demasiado larga!")
    .required("La contraseña es obligatoria"),
  passwordNew: yup
    .string()
    .min(5, "Demasiado corta!")
    .max(30, "Demasiado larga!")
    .required("La nueva contraseña es obligatoria")
    .notOneOf(
      [yup.ref("passwordOld"), null],
      "La nueva contraseña no puede ser igual que la nueva"
    ),
  passwordConfirmation: yup
    .string()
    .min(5, "Demasiado corta!")
    .max(30, "Demasiado larga!")
    .required("La confirmación es obligatoria")
    .oneOf([yup.ref("passwordNew"), null], "Las contraseñas deben coincidir"),
});
