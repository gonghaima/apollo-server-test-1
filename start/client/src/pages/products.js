import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { LaunchTile, Header, Button, Loading } from "../components";

export const GET_PRODUCTS = gql`
  query GetProducts($after: String) {
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
  return <h1>Hello world</h1>;
}
