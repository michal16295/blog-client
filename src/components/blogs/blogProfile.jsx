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
import { getReactions, numOfReactions } from "../../action/reactions";
import Reactions from "../reactions/reactions";
import AllReactions from "../reactions/allReactions";
import { createComment } from "../../action/comment";
import AllComments from "../comments/allComments";
import { Button, Icon, Label } from "semantic-ui-react";

const BlogProfile = ({
  profile: { avatars },
  numOfReactions,
  getReactions,
  createComment,
  auth,
  getPost,
  match,
  deletePost,
  blog: { blog, users, loading, groups },
  comment: { AllCount },
}) => {
  const handleDelete = (e) => {
    deletePost(e);
  };
  const [formData, setFormData] = useState({
    page: 1,
    type: "",
    comment: false,
    commentData: "",
  });
  const { page, type, comment, commentData } = formData;

  useEffect(() => {
    getPost(match.params.id);
    numOfReactions(match.params.id);
  }, [match.params.id]);

  const authButtons = (
    <Fragment>
      <button
        onClick={(e) => {
          if (window.confirm("Are you sure you wish to delete this item?"))
            handleDelete(blog._id);
        }}
        className="btn btn-default"
      >
        <i className="fas fa-trash-alt"></i>
      </button>
      <Link to="/createBlog/true" className="btn btn-default">
        Edit
      </Link>
    </Fragment>
  );

  const commentInput = (
    <Fragment>
      <hr className="s" />
      <form onSubmit={(e) => handleSubmitComment(e)}>
        <input
          style={{ outline: "none" }}
          className="w3-input w3-border w3-round-xxlarge"
          name="commentData"
          value={commentData}
          type="text"
          placeholder="Write A Comment"
          onChange={(e) => onChange(e)}
        />
        <button type="submit"></button>
      </form>
    </Fragment>
  );
  const handleSubmitComment = (e) => {
    e.preventDefault();
    const data = {
      comment: commentData,
      blogId: blog._id,
    };
    createComment(data);
    setFormData({
      ...formData,
      commentData: "",
      comment: false,
    });
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      {blog == null || loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <Link to="/blogs" className="btn btn-dark col-2">
            Back To Posts
          </Link>

          <div className="w3-container w3-card w3-white w3-round w3-margin">
            <br />
            <img
              src={avatars[blog.owner]}
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
                blog.tags.map((tag) => (
                  <MDBBadge color="default">#{tag}</MDBBadge>
                ))}
            </span>
            <br />
            <span>
              Permission:
              {users.length > 0 &&
                users.map((user) => (
                  <MDBBadge key={user._id} color="default">
                    {user}
                  </MDBBadge>
                ))}
              {groups.length > 0 ? (
                groups.map((group) => (
                  <MDBBadge key={group._id} color="default">
                    {group}
                  </MDBBadge>
                ))
              ) : (
                <MDBBadge color="default">Public</MDBBadge>
              )}
            </span>
            <br />

            <hr className="w3-clear" />
            <p>{blog.description}</p>

            <hr className="solid" />
            <div className="row">
              <Reactions />

              <Button as="div" labelPosition="left">
                <Label as="a" basic pointing="right">
                  {AllCount}
                </Label>
                <Button
                  onClick={() =>
                    setFormData({ ...formData, comment: !comment })
                  }
                  icon
                >
                  <Icon name="comment" />
                  Comment
                </Button>
              </Button>
              <span className="col-6"></span>
              <span className="w3-right w3-opacity">
                {auth.user &&
                  !auth.loading &&
                  auth.user.userName === blog.owner &&
                  authButtons}
              </span>
            </div>
            {comment && commentInput}

            <AllComments />
          </div>
        </section>
      )}
    </Fragment>
  );
};
BlogProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  deletePost: PropTypes.func,
  getReactions: PropTypes.func,
  createComment: PropTypes.func,
  comment: PropTypes.object,
  numOfReactions: PropTypes.func,
  profile: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  blog: state.blog,
  comment: state.comment,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getPost,
  deletePost,
  getReactions,
  createComment,
  numOfReactions,
})(BlogProfile);
