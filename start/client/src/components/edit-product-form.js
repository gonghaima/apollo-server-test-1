import React from "react";
import gql from "graphql-tag";
import { DisplayFormikState } from './helper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const UPDATE_PRODUCT = gql`
  mutation uProduct($id:ID!, $price: String!, $productName: String!, $productImage: String!, $description: String!) {
    updateProduct(id:$id,price:$price, productName:$productName, productImage:$productImage, description:$description){
      success
      message
      rowAffected
    }
  }
`;

export default function EditProductForm({ product: { productName } }) {
  // const [mutate, { loading, error }] = useMutation(
  //   UPDATE_PRODUCT,
  //   {
  //     variables: { launchId: id },
  //     refetchQueries: [
  //       {
  //         query: GET_LAUNCH_DETAILS,
  //         variables: { launchId: id }
  //       }
  //     ]
  //   }
  // );
  return (
    <Formik
      initialValues={{ email: 'steve@ggg.com', productName }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required('Required'),
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;

        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" style={{ display: 'block' }}>
              Email
            </label>
            <input
              id="email"
              placeholder="Enter your email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email ? 'text-input error' : 'text-input'
              }
            />
            {errors.email && touched.email && (
              <div className="input-feedback">{errors.email}</div>
            )}

            <button
              type="button"
              className="outline"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
            >
              Reset
            </button>
            <div>
              <label htmlFor="productName" style={{ display: 'block' }}>
                productName
            </label>
              <input
                id="productName"
                placeholder="Enter your productName"
                type="text"
                value={values.productName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>

            <DisplayFormikState {...props} />
          </form>
        );
      }}
    </Formik>
  )
}