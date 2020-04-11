import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getComments, editComment, deleteComment } from "../../action/comment";
import { Comment } from "semantic-ui-react";
import Moment from "react-moment";

const AllComments = ({
  comment: { comments, AllCount, itemsPerPage, currentCount },
  getComments,
  editComment,
  deleteComment,
  blog: { blog, loading },
  auth: { user }
}) => {
  const [formData, setFormData] = useState({
    currentPage: 1,
    edit: false,
    editId: "",
    commentData: ""
  });
  const { currentPage, edit, commentData, editId } = formData;
  useEffect(() => {
    getComments(currentPage, blog._id, true);
  }, []);

  const handleLoadMore = () => {
    setFormData({
      ...formData,
      currentPage: currentPage + 1
    });
    getComments(currentPage + 1, blog._id, false);
  };
  const editForm = (
    <Fragment>
      <form onSubmit={e => handleSubmitComment(e)}>
        <input
          style={{ outline: "none" }}
          className="w3-input w3-border w3-round-xxlarge"
          name="commentData"
          value={commentData}
          type="text"
          placeholder="Write A Comment"
          onChange={e => onChange(e)}
        />
        <button type="submit"></button>
      </form>
    </Fragment>
  );
  const handleSubmitComment = e => {
    e.preventDefault();
    const data = {
      commentId: editId,
      content: commentData
    };
    editComment(data);
  };
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <Comment.Group>
      {comments &&
        user &&
        comments.length > 0 &&
        comments.map(i => (
          <Comment key={i._id}>
            <hr className="s" />
            <Comment.Avatar as="a" src={i.ownerAvatar} />
            <Comment.Content>
              <Comment.Author>{i.userName}</Comment.Author>
              <Comment.Metadata>
                <Moment fromNow>{i.date}</Moment>
                <div>
                  {i.userName === user.userName && (
                    <Comment.Actions>
                      <Comment.Action
                        onClick={() =>
                          setFormData({
                            ...formData,
                            edit: !edit,
                            editId: i._id,
                            commentData: i.content
                          })
                        }
                      >
                        Edit
                      </Comment.Action>
                      <Comment.Action onClick={() => deleteComment(i._id)}>
                        Delete
                      </Comment.Action>
                    </Comment.Actions>
                  )}
                </div>
              </Comment.Metadata>
              {edit && editId === i._id ? (
                editForm
              ) : (
                <Comment.Text>{i.content}</Comment.Text>
              )}
            </Comment.Content>
            {i.update && (
              <Comment.Metadata>
                Last Update:<Moment format="DD/MM/YYYY">{i.update}</Moment>
              </Comment.Metadata>
            )}
          </Comment>
        ))}
      {currentCount >= itemsPerPage && (
        <button onClick={() => handleLoadMore()} className="btn btn-default">
          Load More
        </button>
      )}
    </Comment.Group>
  );
};
AllComments.propTypes = {
  auth: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired,
  comment: PropTypes.object,
  editComment: PropTypes.func,
  deleteComment: PropTypes.func
};
const mapStateToProps = state => ({
  auth: state.auth,
  blog: state.blog,
  comment: state.comment
});
export default connect(mapStateToProps, {
  getComments,
  editComment,
  deleteComment
})(AllComments);
