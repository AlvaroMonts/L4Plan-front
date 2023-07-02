import * as yup from "yup";

export const planValidationSchema = yup.object().shape({
  name: yup
    .string()
    .max(50, "Demasiado largo!")
    .required("El nombre es obligatorio"),
  description: yup.string().max(300, "Demasiado largo!"),
});
