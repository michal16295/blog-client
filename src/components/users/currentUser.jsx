import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../action/auth";
import { deleteAccount } from "../../action/users";
import { Link } from "react-router-dom";
import UserGroups from "../profile/userGroups";
import Modal from "react-bootstrap/Modal";
import { Button, Header, Icon } from "semantic-ui-react";

const CurrentUser = ({ deleteAccount, loadUser, auth: { user, loading } }) => {
  useEffect(() => {
    loadUser();
  }, [loading]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const currentUser = true;
  return loading || user == null ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <div className="profile-grid my-1">
        <div className="profile-top bg-primary p-2">
          <h1 className="large text-primary">My Profile</h1>
          <img src={user.avatar} alt="avatar" className="avatar" />
          <p className="lead">
            <i className="fas fa-user"></i>Welcome{"  "}
            {user && user.firstName}
          </p>

          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Username: {user.userName}</p>
          <p>Email: {user.email}</p>
          <p>
            <Link to="/edit" className="btn btn-light">
              <i className="fas fa-user-circle text-primary"></i> Edit Profile
            </Link>
            {!user.googleId && (
              <Link to="/changePass" className="btn btn-light">
                <i className="fas fa-key text-primary"></i> Change Password
              </Link>
            )}

            <button onClick={handleShow} className="btn btn-light">
              {" "}
              <i className="fas fa-user-alt-slash text-primary"></i> Cancle
              Account
            </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Account</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to Delete your Account ?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  basic
                  color="red"
                  variant="secondary"
                  onClick={handleClose}
                >
                  <Icon name="remove" /> No
                </Button>
                <Button onClick={() => deleteAccount()} color="green" inverted>
                  <Icon name="checkmark" /> Yes
                </Button>
              </Modal.Footer>
            </Modal>

            <Link
              to={`/blogs/${user.userName}/${currentUser}`}
              className="btn btn-light"
            >
              <i className="fas fa-book text-primary"></i> My Posts
            </Link>
          </p>
        </div>
      </div>

      <UserGroups userName={user.userName} currentUser={currentUser} />
    </Fragment>
  );
};

CurrentUser.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { loadUser, deleteAccount })(
  CurrentUser
);
