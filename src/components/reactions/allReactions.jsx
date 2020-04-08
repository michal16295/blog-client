import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import { getReactions } from "../../action/reactions";
import Modal from "react-bootstrap/Modal";
import "./reactions.scss";
import likeFill from "../../img/likeFill.png";

const AllReactions = ({
  getReactions,
  auth,
  blogId,
  reaction: { reactions, count, loading }
}) => {
  const [formData, setFormData] = useState({
    page: 1,
    type: "",
    show: false
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
  const handleShow = () => {
    setFormData({
      ...formData,
      show: true
    });
  };
  return (
    <>
      <button className="btn btn-dafault" onClick={handleShow}>
        Likes {count}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="row">
            <button className="btn btn-default col">All {count}</button>
            <button className="label-reactions love col"></button>
            <button className="label-reactions sad col"></button>
            <button className="label-reactions wow col"></button>
            <button className="label-reactions haha col"></button>
            <button className="label-reactions angry col"></button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reactions &&
            reactions.length > 0 &&
            reactions.map(i => <div>{i.userName}</div>)}
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
  reaction: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  reaction: state.reaction
});
export default connect(mapStateToProps, { getReactions })(AllReactions);
