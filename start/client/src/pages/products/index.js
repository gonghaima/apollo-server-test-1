import React from "react";
import ReactPaginate from "react-paginate";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "@reach/router";
import gql from "graphql-tag";
import styled, { css } from "react-emotion";
import { Loading } from "../../components";
import { GET_PRODUCTS } from "../../gql/queries";
import { SET_CUR_PAGE, SET_NUM_PER_PAGE } from "../../gql/mutations";
import { ProductLayout, ProductContainer, Figure, Img, ProductContent, ProductName, ProductDescription, ProductPrice, StyledTitle, StyledSummaryLeft, StyledSummaryRight, SubHeaderWrapper, ContentWrapper, PaginationWrapper } from "./products.module";
import { DisplayState } from "../../components/helper";



const pageTotal = (total, limit) => Math.ceil(total / limit);


const getParams = (curPage, iPerPage, totalCount) => {
  const offset = +iPerPage * +curPage;
  const limit = offset + +iPerPage;
  if (limit > totalCount) return [totalCount - iPerPage, totalCount];
  return [offset, limit];
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
    <ProductLayout className="product-layout">
      <StyledTitle>All Products</StyledTitle>
      <SubHeaderWrapper>
        <StyledSummaryLeft>
          {data.products && data.products.length} products
      </StyledSummaryLeft>
        <StyledSummaryRight
          className="items-per-page"
          onChange={e =>
            updateNumPerPage({ variables: { newNum: e.target.value } })
          }
        >
          {data.numToDisplay &&
            data.numToDisplay.map(num => (
              <option value={num} key={`option${num}`}>
                {num} per page
            </option>
            ))}
        </StyledSummaryRight>
      </SubHeaderWrapper>

      {/* <DisplayState {...getParams(data.currentPage, data.itemsPerPage)} /> */}

      <ContentWrapper className="contentWrapper">
        {data.products &&
          data.products
            .slice(...getParams(data.currentPage, data.itemsPerPage, data.products.length))
            .map((product, index) => (
              <ProductContainer
                key={index}
                style={{
                }}
              >
                <Figure>
                  <Link to={`/product/${product.id}`}>
                    <Img src={product.productImage} alt="" />
                  </Link>
                </Figure>
                <ProductContent>
                  <ProductName>{product.productName}</ProductName>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductPrice>{product.price}</ProductPrice>
                </ProductContent>
              </ProductContainer>
            ))}
      </ContentWrapper>
      <PaginationWrapper><ReactPaginate
        previousLabel={"< Previous page"}
        nextLabel={"Next page >"}
        breakLabel="..."
        breakClassName="break-me"
        marginPagesDisplayed={5}
        pageCount={
          data.products && pageTotal(data.products.length, data.itemsPerPage)
        }
        pageRangeDisplayed={0}
        onPageChange={e =>
          updateCurrentPage({ variables: { newPageNum: e.selected } })
        }
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
      </PaginationWrapper>
    </ProductLayout>
  );
}
