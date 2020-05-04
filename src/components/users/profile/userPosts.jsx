import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsersBlogs } from "../../../action/blogs";
import Spinner from "../../../common/Spinner";
import SearchBox from "../../../common/searchBox";
import Pagination from "../../../common/pagination";
import PostItem from "./postItem";

const UserPosts = ({
  getUsersBlogs,
  blog: { blogs, loading, count, itemsPerPage },
  userName,
  avatar,
}) => {
  const [formData, setFormData] = useState({
    currentPage: 1,
    query: "",
    userName,
  });
  const { currentPage, query } = formData;
  useEffect(() => {
    getUsersBlogs(currentPage, query, userName);
  }, [userName]);

  const handleSearch = (input) => {
    console.log(input);
  };
  const handlePageChange = (page) => {
    setFormData({
      ...formData,
      currentPage: page,
    });
    getUsersBlogs(page, query, userName);
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <SearchBox value={query} onChange={(input) => handleSearch(input)} />
          <div className="posts">
            {blogs !== undefined && blogs.length > 0 ? (
              blogs.map((blog) => (
                <PostItem key={blog._id} blog={blog} avatar={avatar} />
              ))
            ) : (
              <h4>No Posts Found...</h4>
            )}
          </div>
          <Pagination
            itemsCount={count}
            currentPage={currentPage}
            onPageChange={(page) => handlePageChange(page)}
            pageSize={itemsPerPage}
          />
        </div>
      )}
    </Fragment>
  );
};
UserPosts.propTypes = {
  auth: PropTypes.object.isRequired,
  getUsersBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  userName: PropTypes.string,
  avatar: PropTypes.string,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  blog: state.blog,
});
export default connect(mapStateToProps, { getUsersBlogs })(UserPosts);
