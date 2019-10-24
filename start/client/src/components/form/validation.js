import * as Yup from 'yup';

export const vRule = Yup.object().shape({
    email: Yup.string()
        .email()
        .required('Required'),
    productImage: Yup.string()
        .url()
        .required('Required'),
    productName: Yup.string()
        .required('Required'),
    price: Yup.string()
        .matches(/\$+/, { message: "input must contain $", excludeEmptyString: true })
        .required('Required'),
    description: Yup.string()
        .required('Required')
})
