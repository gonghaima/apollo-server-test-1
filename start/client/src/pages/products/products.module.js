import styled, { css } from "react-emotion";

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

export { ProductLayout, ProductContainer, Figure, Img, ProductContent, ProductName, ProductDescription, ProductPrice, StyledTitle, StyledSummaryLeft, StyledSummaryRight, SubHeaderWrapper, ContentWrapper, PaginationWrapper }