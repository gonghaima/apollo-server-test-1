import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled, { css } from "react-emotion";
import galaxy from "../assets/images/galaxy.jpg";
import iss from "../assets/images/iss.jpg";
import moon from "../assets/images/moon.jpg";
import { useQuery } from "@apollo/react-hooks";
import Card from "../components/card"
import { unit } from "../styles";
import { Loading, Header } from "../components";
import { ALink } from "../components/button";
import { DisplayFormikState } from '../components/helper';
import EditProductForm from "../components/edit-product-form"

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

const LinkWrapper = styled('div')({
  display: "flex",
  justifyContent: "center"
});

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
      <EditProductForm product={data.product[0]} />
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
