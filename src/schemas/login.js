import * as yup from "yup"

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email inválido')
        .required('El email es obligatorio'),
    password: yup
        .string()
        .min(5, 'Demasiado corta!')
        .max(100, 'Demasiado larga!')
        .required('La contraseña es obligatoria')
})