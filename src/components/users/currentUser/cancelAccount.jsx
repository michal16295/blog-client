import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Button, Input, Icon } from "semantic-ui-react";
import { deleteAccount } from "../../../action/users";

const CancelAccount = ({
  deleteAccount,
  auth: { user, loading, error },
  handleModal,
  action,
}) => {
  const [formData, setFormData] = useState({
    password: "",
    userName: "",
    show: true,
  });
  const { password, userName, show } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    deleteAccount(formData);
  };

  return (
    <Modal show={show} onHide={handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: "red" }}>{error}</p>
        Are you sure you want to Delete your Account ?<p></p>
        <Input
          icon="users"
          type="text"
          placeholder="Enter Username"
          name="userName"
          value={userName}
          onChange={(e) => onChange(e)}
          required
        />
        <p></p>
        <Input
          icon="lock"
          type="password"
          placeholder="Enter password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          required
        />
      </Modal.Body>
      <Modal.Footer>
        <Button basic color="red" variant="secondary" onClick={handleModal}>
          <Icon name="remove" /> No
        </Button>
        <Button onClick={(e) => onSubmit(e)} color="green" inverted>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
CancelAccount.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func,
  action: PropTypes.bool,
  handleModal: PropTypes.func,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  deleteAccount,
})(CancelAccount);
