import gql from "graphql-tag";

const DELETE_PRODUCT_DETAILS = gql`
  mutation dProduct($id: ID!) {
    deleteProduct(id: $id){
      success
      message
      rowAffected
    }
  }
`;

export { DELETE_PRODUCT_DETAILS }