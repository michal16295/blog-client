import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getComments } from "../../action/comment";
import { Comment } from "semantic-ui-react";
import CommentItem from "./commentItem";

const AllComments = ({
  comment: { comments, AllCount, itemsPerPage, currentCount },
  getComments,
  blog: { blog, loading },
  auth: { user },
}) => {
  const [formData, setFormData] = useState({
    currentPage: 1,
  });
  const { currentPage } = formData;
  useEffect(() => {
    getComments(currentPage, blog._id, true);
  }, []);

  const handleLoadMore = () => {
    setFormData({
      ...formData,
      currentPage: currentPage + 1,
    });
    getComments(currentPage + 1, blog._id, false);
  };

  return (
    <Comment.Group>
      {comments &&
        user &&
        comments.length > 0 &&
        comments.map((i) => <CommentItem key={i._id} data={i} />)}
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
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  blog: state.blog,
  comment: state.comment,
});
export default connect(mapStateToProps, {
  getComments,
})(AllComments);
