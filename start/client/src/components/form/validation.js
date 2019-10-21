import * as Yup from 'yup';

export const vRule = Yup.object().shape({
    email: Yup.string()
        .email()
        .required('Required'),
    productImage: Yup.string()
        .url()
        .required('Required')
})
