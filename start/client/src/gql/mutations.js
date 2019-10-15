import gql from "graphql-tag";

const DELETE_PRODUCT_DETAILS = gql`
  mutation dProduct($id: ID!, $newPageNum:Int!) {
    deleteProduct(id: $id){
      success
      message
      rowAffected
    }
    updateCurrentPage(pagenum: $newPageNum) @client
  }
`;

export { DELETE_PRODUCT_DETAILS }