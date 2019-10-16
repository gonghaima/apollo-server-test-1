import React from "react";
import styled from "react-emotion";
import ReactPaginate from "react-paginate";

const pageTotal = (total, limit) => Math.ceil(total / limit);

const PaginationWrapper = styled("div")({
  display: "flex",
  flexDirection: "row-reverse",
  padding: "10px"
});

export default function Pagination(props) {
  return (
    <PaginationWrapper><ReactPaginate
      previousLabel={"< Previous page"}
      nextLabel={"Next page >"}
      breakLabel="..."
      breakClassName="break-me"
      marginPagesDisplayed={5}
      pageCount={
        props.data.products && pageTotal(props.data.products.length, props.data.itemsPerPage)
      }
      pageRangeDisplayed={0}
      onPageChange={e =>
        props.updateCurrentPage({ variables: { newPageNum: e.selected } })
      }
      containerClassName="pagination"
      subContainerClassName="pages pagination"
      activeClassName="active"
    />
    </PaginationWrapper>
  );
}
