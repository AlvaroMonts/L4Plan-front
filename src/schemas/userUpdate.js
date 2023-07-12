import * as yup from "yup";

export const userUpdateValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("El nombre es obligatorio")
    .max(30, "Demasiado largo!"),
  lastName: yup.string().max(30, "Demasiado largo!"),
  dateBirth: yup.date(),
});
