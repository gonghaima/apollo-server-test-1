import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled, { css } from "react-emotion";
import galaxy from "../assets/images/galaxy.jpg";
import iss from "../assets/images/iss.jpg";
import moon from "../assets/images/moon.jpg";
import { useQuery } from "@apollo/react-hooks";
import { unit } from "../styles";
import { Loading, Header } from "../components";
import { ALink } from "../components/button";
import { DisplayFormikState } from '../components/helper';

export const GET_PRODUCT_DETAILS = gql`
  query ProductDetails($id: ID!) {
    product(id: $id) {
      id
      productName
      description
      productImage
      price
      updatedAt
      createdAt
    }
  }
`;

const cardClassName = css({
  padding: `${unit * 4}px ${unit * 5}px`,
  borderRadius: 7,
  color: "white",
  backgroundSize: "cover",
  backgroundPosition: "center"
});

const Card = styled('div')(cardClassName, {
  height: 365,
  marginBottom: unit * 4,
});

const LinkWrapper = styled('div')({
  display: "flex",
  justifyContent: "center"
});

const backgrounds = [galaxy, iss, moon];
const getBackgroundImage = () => {
  return `url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]})`;
}

export default function EditProduct({ id }) {
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id }
  });
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <Fragment>
      <Header image={data.product[0].productImage}>
        {data.product[0].productName}
      </Header>
      <Formik
        initialValues={{ email: 'steve@ggg.com', productName: data.product[0].productName }}
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
          debugger
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

      <Card
        style={{
          backgroundImage: getBackgroundImage(),
        }}
      >
        <h3>
          {data.product[0].description}
        </h3>
        <h5>{data.product[0].price}</h5>
      </Card>
      <LinkWrapper>
        <ALink
          to={`/product/details/${id}`}
        >
          Edit
        </ALink>
        <ALink
          to={`/products`}
        >
          Back
        </ALink>
      </LinkWrapper>
    </Fragment>
  );
}
