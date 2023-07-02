import * as yup from "yup";

export const userUpdateValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("El nombre es obligatorio")
    .max(255, "Demasiado largo!"),
  lastName: yup
    .string()
    .required("El apellido es obligatorio")
    .max(255, "Demasiado largo!"),
  dateBirth: yup.date(),
});