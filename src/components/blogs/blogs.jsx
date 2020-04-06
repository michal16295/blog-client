import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import avatar from "../../img/avatar.png";
import SearchBox from "../../common/searchBox";
import Pagination from "../../common/pagination";
import { allBlogs } from "../../action/blogs";
import BlogItem from "./blogItem";

const Blogs = ({ allBlogs, blog: { blogs, loading, count, itemsPerPage } }) => {
  const [formData, setFormData] = useState({
    currentPage: 1,
    query: ""
  });
  const { currentPage, query } = formData;
  useEffect(() => {
    allBlogs(currentPage, query);
  }, []);

  const handlePageChange = page => {
    setFormData({
      currentPage: page
    });
    allBlogs(page, query);
  };
  const handleSearch = input => {
    setFormData({
      query: input,
      currentPage: 1
    });
    allBlogs(currentPage, input);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-users"></i> Browse and Create Posts
          </p>
          <Link to="/createBlog/false" className="btn btn-dark">
            Create post
          </Link>
          <SearchBox value={query} onChange={input => handleSearch(input)} />
          <div className="posts">
            {blogs !== undefined && blogs.length > 0 ? (
              blogs.map(blog => (
                <BlogItem key={blog._id} blog={blog} buttonActions={true} />
              ))
            ) : (
              <h4>No Posts Found...</h4>
            )}
          </div>
          <center>
            <Pagination
              itemsCount={count}
              currentPage={currentPage}
              onPageChange={page => handlePageChange(page)}
              pageSize={itemsPerPage}
            />
          </center>
        </Fragment>
      )}
    </Fragment>
  );
};

Blogs.propTypes = {
  allBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  blog: state.blog
});
export default connect(mapStateToProps, { allBlogs })(Blogs);
