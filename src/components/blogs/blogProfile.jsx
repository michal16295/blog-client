import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import { getPost } from "../../action/blogs";
import Moment from "react-moment";
import avatar from "../../img/avatar.png";
import { deletePost } from "../../action/blogs";
import { MDBBadge, MDBContainer } from "mdbreact";
import { getReactions } from "../../action/reactions";
import Reactions from "../reactions/reactions";
import AllReactions from "../reactions/allReactions";

const BlogProfile = ({
  getReactions,
  auth,
  getPost,
  match,
  deletePost,
  blog: { blog, users, loading, groups }
}) => {
  const handleDelete = e => {
    deletePost(e);
  };
  const [formData, setFormData] = useState({
    page: 1,
    type: ""
  });
  const { page, type } = formData;
  useEffect(() => {
    getPost(match.params.id);
    getReactions(match.params.id, type, page);
  }, []);
  const authButtons = (
    <Fragment>
      <button
        onClick={e => {
          if (window.confirm("Are you sure you wish to delete this item?"))
            handleDelete(blog._id);
        }}
        className="btn btn-default"
      >
        <i class="fas fa-trash-alt"></i>
      </button>
      <Link to="/createBlog/true" className="btn btn-default">
        Edit
      </Link>
    </Fragment>
  );
  return (
    <Fragment>
      {blog == null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/blogs" className="btn btn-dark col-2">
            Back To Posts
          </Link>

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
              {groups.length > 0 ? (
                groups.map(group => (
                  <MDBBadge color="default">{group}</MDBBadge>
                ))
              ) : (
                <MDBBadge color="default">Public</MDBBadge>
              )}
            </span>
            <br />

            <hr className="w3-clear" />
            <p>{blog.description}</p>
            <AllReactions blogId={blog._id} />
            <hr class="solid" />
            <div className="row">
              <Reactions />

              <button
                type="button"
                className="w3-button w3-theme-d2 w3-margin-bottom pull-right col-2"
              >
                <i className="fa fa-comment"></i>  Comment
              </button>
              <span className="col-7"></span>
              <span className="w3-right w3-opacity">
                {auth.user &&
                  !auth.loading &&
                  auth.user.userName === blog.owner &&
                  authButtons}
              </span>
            </div>
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
  deletePost: PropTypes.func,
  getReactions: PropTypes.func
};
const mapStateToProps = state => ({
  auth: state.auth,
  blog: state.blog
});
export default connect(mapStateToProps, { getPost, deletePost, getReactions })(
  BlogProfile
);
