import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deletePost } from "../../../action/blogs";
import Moment from "react-moment";

const PostItem = ({ blog, auth, avatar, deletePost }) => {
  const handleDelete = () => {
    deletePost(blog._id);
  };
  return (
    <div className="w3-container w3-card w3-white w3-round w3-margin">
      <br />
      <img
        src={avatar}
        style={{ width: "60px" }}
        alt="Avatar"
        className="w3-left w3-circle w3-margin-right"
      />
      <Moment format="DD/MM/YYYY" className="w3-right w3-opacity">
        {blog.date}
      </Moment>
      <h4>{blog.title}</h4>
      <br />
      <hr className="w3-clear" />
      <p>{blog.description}</p>
      <hr className="w3-clear" />
      <div className="w3-row-padding"></div>
      <Link to={`/blog/${blog._id}`} className="btn btn-primary">
        <i class="fas fa-book"></i> View Post
      </Link>
      <p style={{ height: "10px" }}></p>
    </div>
  );
};
PostItem.propTypes = {
  auth: PropTypes.object,
  userName: PropTypes.string,
  blog: PropTypes.object.isRequired,
  deletePost: PropTypes.func,
  profile: PropTypes.object,
  avatar: PropTypes.string,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { deletePost })(PostItem);
