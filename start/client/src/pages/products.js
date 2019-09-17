import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled, { css } from "react-emotion";
import { Loading } from "../components";

export function getBackgroundImage(product) {
  return `url(${product.productImage})`;
}

const unit = 8;
const padding = unit * 2;

export const productClassName = css({
  padding: `${unit * 4}px ${unit * 5}px`,
  borderRadius: 7,
  color: "white",
  backgroundSize: "cover",
  backgroundPosition: "center"
});

const StyledParagraph = styled("p")(productClassName, {
  display: "block",
  height: 193,
  marginTop: padding,
  color: "black",
  textDecoration: "none",
  ":not(:last-child)": {
    marginBottom: padding * 2
  }
});

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
  const { data, loading, error } = useQuery(GET_PRODUCTS);
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
      {data.products &&
        data.products.map((product, index) => (
          <StyledParagraph
            key={index}
            style={{
              backgroundImage: getBackgroundImage(product)
            }}
          >
            {product.price}
          </StyledParagraph>
        ))}
    </Fragment>
  );
}
