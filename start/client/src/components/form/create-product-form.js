import React from "react";
import * as Yup from 'yup';
import styled, { css } from "react-emotion";
import { useMutation } from "@apollo/react-hooks";
import { DisplayState } from '../helper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Card from "../card";
import { GET_PRODUCTS_SERVER_ONLY, CREATE_PRODUCT } from "../../gql/queries";
import { colors, unit } from '../../styles';
import Button, { ALink } from "../button";
import { StyledInput, StyledTxtArea, TopFieldsContainer, LinkWrapper, buttonStyle } from "./form.module";

export default function CreateProductForm() {
  let productName = '', description = '', productImage = '', price = '';
  let logging = false;
  const [mutate, { loading, error }] = useMutation(
    CREATE_PRODUCT,
    {
      variables: { productName, description, productImage, price },
      refetchQueries: [
        {
          query: GET_PRODUCTS_SERVER_ONLY
        }
      ],
      onCompleted: () => {
        alert('Create Successful!')
      },
      onError: () => {
        alert('There is an issue to create the item, please try later!')
      }
    }
  );
  return (
    <Formik
      initialValues={{
        email: 'initial@gmail.com', productName, description, productImage, price
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const { productName, description, productImage, price } = values;
        setTimeout(() => {
          mutate({ variables: { productName, description, productImage, price } });
          setSubmitting(false);
          resetForm(values);
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required('Required'),
        productImage: Yup.string()
          .url()
          .required('Required')
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
            <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <TopFieldsContainer className="contentWrapper">
                {logging ? <> <label htmlFor="email" style={{ display: 'block' }}>Email</label>
                  <StyledInput
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
                </> : null}
                <div>
                  <label htmlFor="productName" style={{ display: 'block' }}>
                    Product Name
            </label>
                  <StyledInput
                    id="productName"
                    placeholder="Enter your productName"
                    type="text"
                    value={values.productName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <label htmlFor="productImage" style={{ display: 'block' }}>Product Image</label>
                  {errors.productImage && touched.productImage && (
                    <div className="input-feedback">{errors.productImage}</div>
                  )}
                  <StyledInput
                    id="productImage"
                    placeholder="Enter your productImage"
                    type="text"
                    value={values.productImage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <label htmlFor="price" style={{ display: 'block' }}>
                    Price
            </label>
                  <StyledInput
                    id="price"
                    placeholder="Enter your price"
                    type="text"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </TopFieldsContainer>
              <div>
                <label htmlFor="description" style={{ display: 'block' }}>Description</label>
                <StyledTxtArea
                  id="description"
                  placeholder="Enter your description"
                  value={values.description}
                  onChange={handleChange}
                  rows={2}
                  onBlur={handleBlur}
                />
              </div>
            </Card>
            <LinkWrapper>
              <Button type="submit" style={buttonStyle}>Save</Button>
              <Button
                style={buttonStyle}
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
              >
                Reset
            </Button>
              <ALink to={`/products`}>Back</ALink>
            </LinkWrapper>
            {logging ? <DisplayState {...props} /> : ""}
          </form>
        );
      }}
    </Formik>
  )
}