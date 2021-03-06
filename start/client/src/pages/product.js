import React, { Fragment } from "react";
import gql from "graphql-tag";
import { navigate } from "@reach/router"
import { useMutation } from "@apollo/react-hooks";
import styled, { css } from "react-emotion";
import galaxy from "../assets/images/galaxy.jpg";
import iss from "../assets/images/iss.jpg";
import moon from "../assets/images/moon.jpg";
import { useQuery } from "@apollo/react-hooks";
import { unit } from "../styles";
import { Loading, Header } from "../components";
import { GET_PRODUCTS_SERVER_ONLY, GET_PRODUCTS, GET_PRODUCT_DETAILS } from "../gql/queries";
import { DELETE_PRODUCT_DETAILS } from "../gql/mutations";
import { ALink, Button } from "../components/button";
import Removed from "../components/removed"

const SET_CUR_PAGE = gql`
  mutation updateCurrentPage($newPageNum: Int!) {
    updateCurrentPage(pagenum: $newPageNum) @client
  }
`;

const cardClassName = css({
  padding: `${unit * 4}px ${unit * 5}px`,
  borderRadius: 7,
  color: "white",
  backgroundSize: "cover",
  backgroundPosition: "center"
});

const Card = styled('div')(cardClassName, {
  height: 365,
  marginBottom: unit * 4,
});

const LinkWrapper = styled('div')({
  display: "flex",
  justifyContent: "center"
});

const backgrounds = [galaxy, iss, moon];
const getBackgroundImage = () => {
  return `url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]})`;
}

export default function Product({ id }) {
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id }
  });

  const [mutate] = useMutation(
    DELETE_PRODUCT_DETAILS,
    {
      variables: { id, newPageNum: 1 },
      refetchQueries: [
        {
          query: GET_PRODUCTS,
        },
        {
          query: GET_PRODUCT_DETAILS,
          variables: { id }
        }
      ]
    }
  );

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data.product || !data.product[0]) return <Removed msg='No product data available' />;
  if (!data.product[0].productImage) return <Removed msg='product image is not available' />;

  return (
    <Fragment>
      <Header image={data.product[0].productImage}>
        {data.product[0].productName}
      </Header>
      <Card
        style={{
          backgroundImage: getBackgroundImage(),
        }}
      >
        <h3>
          {data.product[0].description}
        </h3>
        <h5>{data.product[0].price}</h5>
      </Card>
      <LinkWrapper>
        <ALink
          className="form-button"
          to={`/product/edit/${id}`}
        >
          Edit
        </ALink>
        <Button className="form-button" onClick={() => {
          if (window.confirm("Do you really want to delete this item?")) {
            mutate({ variables: { id } });
          }
        }}>
          Delete
        </Button>
        <ALink
          className="form-button"
          to={`/product/create`}
        >
          New
        </ALink>
        <ALink
          className="form-button"
          to={`/products`}
        >
          Back
        </ALink>
      </LinkWrapper>
    </Fragment>
  );
}
