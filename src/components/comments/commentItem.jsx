import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getComments, editComment, deleteComment } from "../../action/comment";
import { Comment } from "semantic-ui-react";
import Moment from "react-moment";
import { getUserAvatar } from "../../action/users";

const CommentItem = ({
  data,
  profile: { loading, avatars },
  getUserAvatar,
  editComment,
  deleteComment,
  auth: { user },
}) => {
  const [formData, setFormData] = useState({
    edit: false,
    editId: "",
    commentData: "",
  });
  const { edit, commentData, editId } = formData;
  useEffect(() => {
    getUserAvatar(data.userName);
  }, []);

  const editForm = (
    <Fragment>
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
      commentId: editId,
      content: commentData,
    };
    editComment(data);
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Comment>
      <hr className="s" />
      {!loading && <Comment.Avatar as="a" src={avatars[data.userName]} />}
      <Comment.Content>
        <Comment.Author>{data.userName}</Comment.Author>
        <Comment.Metadata>
          <Moment fromNow>{data.date}</Moment>
          <div>
            {data.userName === user.userName && (
              <Comment.Actions>
                <Comment.Action
                  onClick={() =>
                    setFormData({
                      ...formData,
                      edit: !edit,
                      editId: data._id,
                      commentData: data.content,
                    })
                  }
                >
                  Edit
                </Comment.Action>
                <Comment.Action
                  style={{ color: "red" }}
                  onClick={() => deleteComment(data._id)}
                >
                  Delete
                </Comment.Action>
              </Comment.Actions>
            )}
          </div>
        </Comment.Metadata>
        {edit && editId === data._id ? (
          editForm
        ) : (
          <Comment.Text>{data.content}</Comment.Text>
        )}
      </Comment.Content>
      {data.update && (
        <Comment.Metadata>
          Last Update:<Moment format="DD/MM/YYYY">{data.update}</Moment>
        </Comment.Metadata>
      )}
    </Comment>
  );
};
CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  editComment: PropTypes.func,
  deleteComment: PropTypes.func,
  getUserAvatar: PropTypes.func,
  profile: PropTypes.object,
  data: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  blog: state.blog,
  comment: state.comment,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getComments,
  editComment,
  deleteComment,
  getUserAvatar,
})(CommentItem);
