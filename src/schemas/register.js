import * as yup from "yup"

export const registerValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email inválido')
        .required('El email es obligatorio'),
    name: yup
        .string()
        .required('El nombre es obligatorio'),
    password: yup
        .string()
        .min(5, 'Demasiado corta!')
        .max(100, 'Demasiado larga!')
        .required('La contraseña es obligatoria'),
    passwordConfirmation: yup
        .string()
        .min(5, 'Demasiado corta!')
        .max(100, 'Demasiado larga!')
        .required('La contraseña es obligatoria')
        .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
})