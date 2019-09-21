import React, { Fragment } from "react";
import ReactPaginate from "react-paginate";
import { useQuery, useMutation } from "@apollo/react-hooks";
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
    numToDisplay @client
    currentPage @client
    itemsPerPage @client
  }
`;

const pageTotal = (total, limit) => Math.ceil(total / limit);

const SET_NUM_PER_PAGE = gql`
  mutation updateItemsPerPage($newNum: Int!) {
    updateItemsPerPage(num: $newNum) @client
  }
`;

const SET_CUR_PAGE = gql`
  mutation updateCurrentPage($newPageNum: Int!) {
    updateCurrentPage(pagenum: $newPageNum) @client
  }
`;

// const getParams = (curPage, iPerPage) => {
//   const offset = iPerPage * (curPage + 1);
//   const limit = offset + iPerPage;
//   return [offset, limit];
// };

const getOffSet = (curPage, iPerPage) => {
  console.log('calc');
  
  return iPerPage * curPage;
};

export default function Products() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [updateNumPerPage] = useMutation(SET_NUM_PER_PAGE);
  const [updateCurrentPage] = useMutation(SET_CUR_PAGE);
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
      <select
        onChange={e =>
          updateNumPerPage({ variables: { newNum: e.target.value } })
        }
      >
        {data.numToDisplay &&
          data.numToDisplay.map(num => (
            <option value={num}>{num}perPage</option>
          ))}
      </select>
      <p>currentPage {data.currentPage}</p>
      <p>itemsPerPage {data.itemsPerPage}</p>
      <p>offset {getOffSet(data.currentPage, data.itemsPerPage)}</p>
      <p>
        limit{" "}
        {getOffSet(data.currentPage, data.itemsPerPage) + data.itemsPerPage}
      </p>
      {data.products &&
        data.products
          .slice(
            getOffSet(data.currentPage, data.itemsPerPage),
            getOffSet(data.currentPage, data.itemsPerPage) + data.itemsPerPage
          )
          .map((product, index) => (
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
        marginPagesDisplayed={5}
        pageCount={
          data.products && pageTotal(data.products.length, data.itemsPerPage)
        }
        pageRangeDisplayed={25}
        forcePage={3}
        onPageChange={e =>
          updateCurrentPage({ variables: { newPageNum: e.selected } })
        }
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </Fragment>
  );
}
