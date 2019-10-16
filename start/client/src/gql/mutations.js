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

export { DELETE_PRODUCT_DETAILS, SET_CUR_PAGE, SET_NUM_PER_PAGE }