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
        .required('Required'),
    description: Yup.string()
        .required('Required')
})
