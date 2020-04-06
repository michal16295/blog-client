import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsersBlogs, myBlogs } from "../../action/blogs";
import Spinner from "../../common/Spinner";
import SearchBox from "../../common/searchBox";
import Pagination from "../../common/pagination";
import BlogItem from "./blogItem";

const UserBlogs = ({
  auth,
  getUsersBlogs,
  blog: { blogs, loading, count, itemsPerPage },
  match,
  myBlogs
}) => {
  const [formData, setFormData] = useState({
    currentPage: 1,
    query: ""
  });
  const { currentPage, query } = formData;
  const { userName, currentUser } = match.params;

  const common = (page, input) => {
    if (currentUser == "true") myBlogs(page, input);
    else getUsersBlogs(page, input, userName);
  };
  useEffect(() => {
    common();
  }, []);

  const handlePageChange = page => {
    setFormData({
      currentPage: page
    });
    common(page, query);
  };
  const handleSearch = input => {
    setFormData({
      query: input,
      currentPage: 1
    });
    common(currentPage, input);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h3 className="lead text-primary">{userName} Posts</h3>
          <SearchBox value={query} onChange={input => handleSearch(input)} />
          <div className="posts">
            {blogs !== undefined && blogs.length > 0 ? (
              blogs.map(blog => <BlogItem key={blog._id} blog={blog} />)
            ) : (
              <h4>No Posts Found...</h4>
            )}
          </div>
          <Pagination
            itemsCount={count}
            currentPage={currentPage}
            onPageChange={page => handlePageChange(page)}
            pageSize={itemsPerPage}
          />
        </Fragment>
      )}
    </Fragment>
  );
};
UserBlogs.propTypes = {
  auth: PropTypes.object.isRequired,
  getUsersBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  myBlogs: PropTypes.func
};
const mapStateToProps = state => ({
  auth: state.auth,
  blog: state.blog
});
export default connect(mapStateToProps, { getUsersBlogs, myBlogs })(UserBlogs);
