import React, { Fragment } from "react";
import ReactPaginate from "react-paginate";
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
    itemsPerPage @client
    currentPage @client
  }
`;

export default function Products() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    console.log(error);
    return <p>ERROR</p>;
  }
  return (
    <Fragment>
      <h1>All Products</h1>
      <p>{data.products && data.products.length} products</p>
      <select>
        {data.itemsPerPage &&
          data.itemsPerPage.map(num => (
            <option value={num}>{num}perPage</option>
          ))}
      </select>
      {data.products &&
        data.products.slice(200, 205).map((product, index) => (
          <StyledParagraph
            key={index}
            style={{
              backgroundImage: getBackgroundImage(product)
            }}
          >
            {product.price}
          </StyledParagraph>
        ))}

      <ReactPaginate
        previousLabel={"< Previous page"}
        nextLabel={"Next page >"}
        breakLabel="..."
        breakClassName="break-me"
        marginPagesDisplayed={9}
        pageCount={8}
        pageRangeDisplayed={25}
        forcePage={3}
        onPageChange={e => {}}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </Fragment>
  );
}
