import React from "react";
import ReactPaginate from "react-paginate";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "@reach/router";
import gql from "graphql-tag";
import styled, { css } from "react-emotion";
import { Loading } from "../components";
import { DisplayState } from "../components/helper";

// export function getBackgroundImage(product) {
//   return `url(${product.productImage})`;
// }

// const unit = 8;
// const padding = unit * 2;

const breakpoints = [576, 768, 1024, 1280];
const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
);


export const productClassName = css({
  borderRadius: 7,
  color: "white",
  border: "1px solid #e5e5e5",
  backgroundSize: "cover",
  backgroundPosition: "center"
});

const ProductLayout = styled("div")({
  background: "#f6f6f6"
});


const ProductContainer = styled("div")(productClassName, {
  display: "block",
  color: "black",
  textDecoration: "none",
  background: "#fff"
});

const Figure = styled("figure")({
  margin: 0,
  padding: "16px",
  display: "flex",
  justifyContent: "center",
  borderBottom: "1px solid #e5e5e5"
});

const Img = styled("img")({
  height: "15rem",
  width: "auto"
});

const ProductContent = styled("div")({
  textAlign: "left",
  paddingLeft: "2rem"
});

const ProductName = styled("h4")({
  paddingTop: "16px",
  color: "#6a6a6a"
});

const ProductDescription = styled("h4")({
  paddingTop: "5px",
  color: "#bfbfbf"
});

const ProductPrice = styled("h6")({
  marginTop: "10px",
  marginBottom: "22px"
});

const StyledTitle = styled("p")({
  width: "100%",
  margin: "0 0 0 10px",
  color: "#6a6a6a",
  fontSize: "1.5rem",
  fontWeight: 700
});

const StyledSummaryLeft = styled("p")({
  width: "50%",
  color: "#7a7a7a",
  fontSize: "16px",
});

const StyledSummaryRight = styled("select")({
  height: "28px",
  color: "#7a7a7a",
  fontSize: "11px",
  background: "#f6f6f6",
  border: 0,
  outline: "none"
});

const SubHeaderWrapper = styled("div")({
  display: "flex",
  alignItems: "baseline",
  margin: "0 10px 0 10px",
  justifyContent: "space-between"
});

const ContentWrapper = styled("div")({
  display: "grid",
  gridGap: "16px"
});

const PaginationWrapper = styled("div")({
  display: "flex",
  flexDirection: "row-reverse",
  padding: "10px"
});

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
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

const getParams = (curPage, iPerPage) => {
  const offset = +iPerPage * +curPage;
  const limit = offset + +iPerPage;
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

      <DisplayState {...getParams(data.currentPage, data.itemsPerPage)} />

      <ContentWrapper className="contentWrapper">
        {data.products &&
          data.products
            .slice(...getParams(data.currentPage, data.itemsPerPage))
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
