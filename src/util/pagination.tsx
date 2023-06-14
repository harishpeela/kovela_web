import React, { useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import PropTypes from "prop-types";

type Props = {
    itemsCount: number,
    itemsPerPage: number,
    currentPage: number,
    setCurrentPage: any,
    alwaysShown: boolean
}  

const PaginationComponent = (props: Props) => {
  let pagesCount = Math.ceil(props.itemsCount / props.itemsPerPage);
  let isPaginationShown = props.alwaysShown ? true : pagesCount > 1;
  let isCurrentPageFirst = props.currentPage === 1;
  let isCurrentPageLast = props.currentPage === pagesCount;

  const changePage = (number: number) => {
    if (props.currentPage === number) return;
    props.setCurrentPage(number);
  };

  const onPageNumberClick = (pageNumber: number) => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    changePage(props.currentPage - 1);
  };

  const onNextPageClick = () => {
    changePage(props.currentPage + 1);
  };

  const setLastPageAsCurrent = () => {
    if (props.currentPage > pagesCount) {
        props.setCurrentPage(pagesCount);
    }
  };

  let isPageNumberOutOfRange: boolean;

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - props.currentPage) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === props.currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis key={pageNumber} className="muted" />;
    }

    return null;
  });

  useEffect(setLastPageAsCurrent, [pagesCount]);

  return (
    <>
      {isPaginationShown && (
        <Pagination>
          <Pagination.Prev
            onClick={onPreviousPageClick}
            disabled={isCurrentPageFirst}
          />
          {pageNumbers}
          <Pagination.Next
            onClick={onNextPageClick}
            disabled={isCurrentPageLast}
          />
        </Pagination>
      )}
    </>
  );
};

PaginationComponent.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  alwaysShown: PropTypes.bool
};

export default PaginationComponent;