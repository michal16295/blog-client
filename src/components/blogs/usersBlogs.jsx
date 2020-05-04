import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsersBlogs, myBlogs } from "../../action/blogs";
import Spinner from "../../common/Spinner";
import SearchBox from "../../common/searchBox";
import Pagination from "../../common/pagination";
import BlogItem from "./blogItem";

const UserBlogs = ({
  getUsersBlogs,
  blog: { blogs, loading, count, itemsPerPage },
  match,
  myBlogs,
  user,
}) => {
  const [formData, setFormData] = useState({
    currentPage: 1,
    query: "",
    userBlogs: user,
    currentUser: false,
  });
  const { currentPage, query, userBlogs, currentUser } = formData;

  const common = () => {
    console.log(user);
    if (currentUser === "true") myBlogs(currentPage, query);
    else {
      if (user !== undefined) getUsersBlogs(currentPage, query, user);
      else {
        setFormData({
          ...formData,
          userBlogs: match.params.userName,
          currentUser: match.params.currentUser,
        });
        getUsersBlogs(currentPage, query, match.params.userName);
      }
    }
  };
  useEffect(() => {
    common();
  }, []);

  const handlePageChange = (page) => {
    setFormData({
      ...formData,
      currentPage: page,
    });
    common(page, query);
  };
  const handleSearch = (input) => {
    setFormData({
      ...formData,
      query: input,
      currentPage: 1,
    });
    common(currentPage, input);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <h3 className="lead text-primary">{userBlogs} Posts</h3>
          <SearchBox value={query} onChange={(input) => handleSearch(input)} />
          <div className="posts">
            {blogs !== undefined && blogs.length > 0 ? (
              blogs.map((blog) => <BlogItem key={blog._id} blog={blog} />)
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
        </section>
      )}
    </Fragment>
  );
};
UserBlogs.propTypes = {
  auth: PropTypes.object.isRequired,
  getUsersBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  myBlogs: PropTypes.func,
  user: PropTypes.string,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  blog: state.blog,
});
export default connect(mapStateToProps, { getUsersBlogs, myBlogs })(UserBlogs);
