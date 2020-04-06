import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import { getPost } from "../../action/blogs";
import Moment from "react-moment";
import avatar from "../../img/avatar.png";
import { deletePost } from "../../action/blogs";
import { MDBBadge, MDBContainer } from "mdbreact";

const BlogProfile = ({
  auth,
  getPost,
  match,
  deletePost,
  blog: { blog, users, loading, groups }
}) => {
  const handleDelete = e => {
    deletePost(e);
  };
  useEffect(() => {
    getPost(match.params.id);
  }, []);

  return (
    <Fragment>
      {blog == null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <p className="row">
            <h4 className="col-4"></h4>
            {auth.user && !auth.loading && auth.user.userName === blog.owner && (
              <Fragment>
                <button
                  onClick={e => {
                    if (
                      window.confirm(
                        "Are you sure you wish to delete this item?"
                      )
                    )
                      handleDelete(blog._id);
                  }}
                  className="btn btn-danger"
                >
                  <i className="fas fa-times" />
                </button>
                <Link to="/createBlog/true" className="btn btn-primary">
                  Edit
                </Link>
              </Fragment>
            )}
            <Link to="/blogs" className="btn btn-dark col-2">
              Back To Posts
            </Link>
          </p>
          <div class="w3-container w3-card w3-white w3-round w3-margin">
            <br />
            <img
              src={avatar}
              alt="Avatar"
              className="w3-left w3-circle w3-margin-right"
              style={{ width: "60px" }}
            />
            <Moment className="w3-right w3-opacity" format="DD/MM/YYYY">
              {blog.date}
            </Moment>
            <h4>{blog.title}</h4>
            <span>By: {blog.owner}</span>
            <br />
            <span>
              Tags:
              {blog.tags !== undefined &&
                blog.tags.length > 0 &&
                blog.tags.map(tag => (
                  <MDBBadge color="default">#{tag}</MDBBadge>
                ))}
            </span>
            <br />
            <span>
              Permission:
              {users.length > 0 &&
                users.map(user => <MDBBadge color="default">{user}</MDBBadge>)}
              {groups.length > 0 &&
                groups.map(group => (
                  <MDBBadge color="default">{group}</MDBBadge>
                ))}
            </span>
            <hr className="w3-clear" />
            <p>{blog.description}</p>
            <button
              type="button"
              className="w3-button w3-theme-d1 w3-margin-bottom"
            >
              <i className="fa fa-thumbs-up"></i>  Like
            </button>
            <button
              type="button"
              className="w3-button w3-theme-d2 w3-margin-bottom"
            >
              <i className="fa fa-comment"></i>  Comment
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
BlogProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  deletePost: PropTypes.func
};
const mapStateToProps = state => ({
  auth: state.auth,
  blog: state.blog
});
export default connect(mapStateToProps, { getPost, deletePost })(BlogProfile);
