import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { LaunchTile, Header, Button, Loading } from "../components";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      price
      productName
      productImage
      description
    }
  }
`;

export default function Products() {
  const { data, loading, error, fetchMore } = useQuery(GET_PRODUCTS);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    debugger;
    console.log(error);
    return <p>ERROR</p>;
  }
  return (
    <Fragment>
      <Header />
      {data.products && data.products.map(product => <p>{product.price}</p>)}
    </Fragment>
  );
}
