import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  const { onPageChange, currentPage, pageSize, itemsCount } = props;
  const totalPages = Math.ceil(itemsCount / pageSize);
  if (totalPages === 1) return null;
  const pages = _.range(1, totalPages + 1);

  return (
    <center className="text-xs-center">
      <ul className="pagination justify-content-center">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </center>
  );
};
Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};
export default Pagination;
