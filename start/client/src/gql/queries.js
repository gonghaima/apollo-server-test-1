import gql from "graphql-tag";

const GET_PRODUCTS = gql`
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

const GET_PRODUCTS_Server_Only = gql`
  query GetProducts {
    products {
      id
      price
      productName
      productImage
      description
    }
  }
`;

const GET_PRODUCT_DETAILS = gql`
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

const UPDATE_PRODUCT = gql`
  mutation uProduct($id:ID!, $price: String!, $productName: String!, $productImage: String!, $description: String!) {
    updateProduct(id:$id,price:$price, productName:$productName, productImage:$productImage, description:$description){
      success
      message
      rowAffected
    }
  }
`;



export { GET_PRODUCTS, GET_PRODUCTS_Server_Only, GET_PRODUCT_DETAILS, UPDATE_PRODUCT }