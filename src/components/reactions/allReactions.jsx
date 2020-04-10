import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getReactions } from "../../action/reactions";
import Modal from "react-bootstrap/Modal";
import { Comment } from "semantic-ui-react";
import "./reactions.scss";

const AllReactions = ({
  getReactions,
  auth,
  blogId,
  reaction: { reactions, count, loading, AllCount },
  action
}) => {
  const [formData, setFormData] = useState({
    page: 1,
    type: "",
    show: action
  });
  const { page, type, show } = formData;
  useEffect(() => {
    getReactions(blogId, type, page);
  }, [count]);

  const handleClose = () => {
    setFormData({
      ...formData,
      show: false
    });
  };

  const handleType = type => {
    setFormData({
      ...formData,
      type
    });
    getReactions(blogId, type, page);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="row">
            <button
              onClick={() => handleType("")}
              className="btn btn-default col"
            >
              All {AllCount}
            </button>
            <button
              onClick={() => handleType("like")}
              className="label-reactions like col"
            ></button>
            <button
              onClick={() => handleType("love")}
              className="label-reactions love col"
            ></button>
            <button
              onClick={() => handleType("sad")}
              className="label-reactions sad col"
            ></button>
            <button
              onClick={() => handleType("wow")}
              className="label-reactions wow col"
            ></button>
            <button
              onClick={() => handleType("haha")}
              className="label-reactions haha col"
            ></button>
            <button
              onClick={() => handleType("angry")}
              className="label-reactions angry col"
            ></button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{count}</h3>
          <Comment.Group>
            {reactions && reactions.length > 0 ? (
              reactions.map(i => (
                <Comment key={i._id}>
                  <hr className="s" />
                  <Comment.Avatar as="a" src={i.ownerAvatar} />
                  <Comment.Content>
                    <Comment.Author>{i.userName}</Comment.Author>
                  </Comment.Content>
                </Comment>
              ))
            ) : (
              <div>No Reactions</div>
            )}
          </Comment.Group>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
AllReactions.propTypes = {
  auth: PropTypes.object.isRequired,
  getReactions: PropTypes.func,
  blogId: PropTypes.string,
  reaction: PropTypes.object.isRequired,
  action: PropTypes.bool
};
const mapStateToProps = state => ({
  auth: state.auth,
  reaction: state.reaction
});
export default connect(mapStateToProps, { getReactions })(AllReactions);
