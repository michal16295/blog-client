import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../action/auth";
import { Link } from "react-router-dom";
import UserGroups from "../profile/userGroups";

const CurrentUser = ({ loadUser, auth: { user, loading } }) => {
  useEffect(() => {
    loadUser();
  }, [loading]);
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
            <Link
              to={`/cancleAccount/${user.userName}`}
              className="btn btn-light"
            >
              <i className="fas fa-user-alt-slash text-primary"></i> Cancle
              Account
            </Link>
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
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { loadUser })(CurrentUser);
