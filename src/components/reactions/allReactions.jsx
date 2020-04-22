import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getReactions } from "../../action/reactions";
import Modal from "react-bootstrap/Modal";
import { Comment } from "semantic-ui-react";
import ReactionItem from "./reactionItem";
import "./reactions.scss";

const AllReactions = ({
  handleModal,
  getReactions,
  auth,
  blogId,
  reaction: { reactions, currentCount, loading, AllCount, itemsPerPage },
  action,
}) => {
  const [formData, setFormData] = useState({
    page: 1,
    type: "",
    show: action,
  });
  const { page, type, show } = formData;
  useEffect(() => {
    getReactions(blogId, type, page, true);
  }, []);

  const handleType = (newType) => {
    let prevType = false;
    if (newType !== type) prevType = true;
    console.log(prevType);
    setFormData({
      ...formData,
      type: newType,
    });
    getReactions(blogId, newType, page, prevType);
  };
  const getMore = () => {
    setFormData({
      ...formData,
      page: page + 1,
    });
    getReactions(blogId, type, page + 1);
  };
  return (
    <>
      <Modal
        scrollable={true}
        show={show}
        onHide={handleModal}
        style={{ overflowY: "initial !important" }}
      >
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
        <Modal.Body style={{ maxHeight: "400px" }}>
          {type === "" ? <h3>{AllCount}</h3> : <h3>{currentCount}</h3>}
          <Comment.Group>
            {reactions && reactions.length > 0 ? (
              reactions.map((i) => <ReactionItem data={i} />)
            ) : (
              <div>No Reactions</div>
            )}
          </Comment.Group>
        </Modal.Body>
        <Modal.Footer>
          {currentCount >= itemsPerPage && (
            <button onClick={() => getMore()} className="btn btn-dafault">
              Load More
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
AllReactions.propTypes = {
  auth: PropTypes.object.isRequired,
  getReactions: PropTypes.func,
  blogId: PropTypes.string,
  reaction: PropTypes.object.isRequired,
  action: PropTypes.bool,
  handleModal: PropTypes.func,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  reaction: state.reaction,
});
export default connect(mapStateToProps, { getReactions })(AllReactions);
