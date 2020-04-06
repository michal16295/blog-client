import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deletePost } from "../../action/blogs";
import Moment from "react-moment";

const BlogItem = ({ blog, auth, userName, deletePost }) => {
  const handleDelete = () => {
    deletePost(blog._id);
  };
  return (
    <div className="post bg-white p-1 m-1">
      <div>
        <img src={blog.ownerAvatar} alt="avatar" className="round-img" />
        <p></p>
        <span>{blog.owner}</span>
        <p>
          <Link to={`/profile/${blog.owner}`} className="btn btn-primary">
            View Profile
          </Link>
        </p>
      </div>
      <div>
        <Fragment>
          {" "}
          <h5>{blog.title}</h5>
        </Fragment>

        <p className="post-date">
          Created on: <Moment format="DD/MM/YYYY">{blog.date}</Moment>
        </p>
        <p></p>
        <span>
          {auth.user && !auth.loading && blog.owner === auth.user.userName && (
            <Fragment>
              <button
                onClick={e => {
                  if (
                    window.confirm("Are you sure you wish to delete this item?")
                  )
                    handleDelete();
                }}
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            </Fragment>
          )}
          <Link to={`/blog/${blog._id}`} className="btn btn-primary">
            View Post
          </Link>
        </span>
      </div>
    </div>
  );
};
BlogItem.propTypes = {
  auth: PropTypes.object,
  userName: PropTypes.string,
  blog: PropTypes.object.isRequired,
  deletePost: PropTypes.func
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { deletePost })(BlogItem);
