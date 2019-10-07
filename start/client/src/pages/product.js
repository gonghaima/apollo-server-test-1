import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Loading } from "../components";

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
export default function Product({ id }) {
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id }
  });
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <Fragment>
      <h1>{data.product[0].productName}</h1>
    </Fragment>
  );
}
