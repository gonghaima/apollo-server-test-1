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

const GET_PRODUCTS_SERVER_ONLY = gql`
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

const CREATE_PRODUCT = gql`
  mutation cProduct($price: String!, $productName: String!, $productImage: String!, $description: String!) {
    createProduct(price:$price, productName:$productName, productImage:$productImage, description:$description){
      success
      message
      product {
        id
        productName
        description
        productImage
        price
        updatedAt
        createdAt
      }
    }
  }
`;


export { GET_PRODUCTS, GET_PRODUCTS_SERVER_ONLY, GET_PRODUCT_DETAILS, UPDATE_PRODUCT, CREATE_PRODUCT }