import * as yup from "yup";

export const changePasswordLoggedValidationSchema = yup.object().shape({
  passwordOld: yup
    .string()
    .min(5, "Demasiado corta!")
    .max(100, "Demasiado larga!")
    .required("Contraseña es obligatoria"),
  passwordNew: yup
    .string()
    .min(5, "Demasiado corta!")
    .max(100, "Demasiado larga!")
    .required("Contraseña es obligatoria"),
  passwordConfirmation: yup
    .string()
    .min(5, "Demasiado corta!")
    .max(100, "Demasiado larga!")
    .required("Campo obligatorio")
    .oneOf([yup.ref("passwordNew"), null], "Las contraseñas deben coincidir"),
});
