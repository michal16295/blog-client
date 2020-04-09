import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getComments } from "../../action/comment";
import { Comment, Icon } from "semantic-ui-react";
import Moment from "react-moment";

const AllComments = ({
  comment: { comments, AllCount, itemsPerPage, currentCount },
  getComments,
  blog: { blog, loading },
  auth: { user }
}) => {
  const [formData, setFormData] = useState({
    currentPage: 1
  });
  const { currentPage } = formData;
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
  return (
    <Comment.Group>
      {comments &&
        comments.length > 0 &&
        comments.map(i => (
          <Comment key={i._id}>
            <hr className="s" />
            <Comment.Avatar
              as="a"
              src="https://react.semantic-ui.com/images/avatar/small/stevie.jpg"
            />
            <Comment.Content>
              <Comment.Author>{i.userName}</Comment.Author>
              <Comment.Metadata>
                <Moment fromNow>{i.date}</Moment>
                <div>
                  {i.userName === user.userName && (
                    <Fragment>
                      <button>edit</button>
                      <button>delete</button>
                    </Fragment>
                  )}
                </div>
              </Comment.Metadata>
              <Comment.Text>{i.content}</Comment.Text>
            </Comment.Content>
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
  comment: PropTypes.object
};
const mapStateToProps = state => ({
  auth: state.auth,
  blog: state.blog,
  comment: state.comment
});
export default connect(mapStateToProps, { getComments })(AllComments);
