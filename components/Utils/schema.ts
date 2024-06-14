import * as yup from "yup";

export const updateUserSchema = yup
    .object()
    .shape({
        name: yup
            .string()
            .matches(/^([^0-9]*)$/, "First name should not container number")
            .required("Name is empty"),
        userCurrency: yup
            .number()
            .required("Currency is empty"),
        subscribe: yup.string()
    })
    .required();


 export const addUserSchema = yup
    .object()
    .shape({
        name: yup
            .string()
            .matches(/^([^0-9]*)$/, "First name should not container number")
            .required("Name is empty"),
        userCurrency: yup.number().required("Currency is empty"),
        subscribe: yup.string()
    })
    .required();
