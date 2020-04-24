import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CancelAccount from "./cancelAccount";
import Spinner from "../../../common/Spinner";
import "./profile.css";
import { Link } from "react-router-dom";

const SideBar = ({ loadUser, auth: { user, loading, error } }) => {
  const [formData, setFormData] = useState({
    password: "",
    userName: "",
    show: false,
  });
  const { show } = formData;

  const handleModal = () => {
    setFormData({
      ...formData,
      show: !show,
      password: "",
      userName: "",
    });
  };
  const handleShow = () => {
    setFormData({
      ...formData,
      show: true,
    });
  };

  return (
    <Fragment>
      {!user ? (
        <Spinner />
      ) : (
        <Fragment>
          {show && <CancelAccount handleModal={handleModal} show={true} />}
          <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
            <i className="fas fa-bars"></i>
          </a>
          <nav id="sidebar" className="sidebar-wrapper">
            <div className="sidebar-content">
              <div className="sidebar-header">
                <div className="user-pic">
                  <img
                    className="img-responsive img-rounded"
                    src={user.avatar}
                    alt="User picture"
                  />
                </div>
                <div className="user-info">
                  <span className="user-name">
                    <strong>{user.userName}</strong>
                  </span>
                  <span className="user-role">User</span>
                  <span className="user-status">
                    <i className="fa fa-circle"></i>
                    <span>Online</span>
                  </span>
                </div>
              </div>
              <div className="sidebar-search">
                <div>
                  <span className="user-name">
                    <strong style={{ color: "white" }}>
                      {user.firstName + " " + user.lastName}
                    </strong>
                    <br />
                    <strong style={{ color: "white" }}>{user.email}</strong>
                  </span>
                </div>
              </div>
              <div className="sidebar-menu">
                <ul>
                  <li className="header-menu">
                    <span>General</span>
                  </li>
                  <li className="sidebar-dropdown">
                    <Link to="currentUser">
                      <i className="fas fa-users"></i>
                      <span>Groups</span>
                    </Link>
                  </li>
                  <li className="sidebar-dropdown">
                    <Link to={`/blogs/${user.userName}/${true}`}>
                      <i className="fas fa-book"></i>
                      <span>My Posts</span>
                    </Link>
                  </li>
                  <li className="sidebar-dropdown">
                    <a href="#">
                      <i className="fas fa-ban"></i>
                      <span>Blocked Users</span>
                    </a>
                  </li>
                  <li className="sidebar-dropdown">
                    <a href="#">
                      <i className="fas fa-newspaper"></i>
                      <span>Subscriptions</span>
                    </a>
                  </li>
                  <li className="header-menu">
                    <span>Settings</span>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-bell"></i>
                      <span>Notification Settings</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={() => handleShow()}>
                      <i className="fas fa-user-alt-slash"></i>
                      <span>Cancel Account</span>
                    </a>
                  </li>
                  <li>
                    <Link to="/changePass">
                      <i className="fa fa-lock"></i>
                      <span>Change Password</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit">
                      <i className="fas fa-user-circle" /> Edit Profile
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="sidebar-footer">
              <Link to="/notifications">
                <i className="fa fa-bell"></i>
              </Link>
              <Link to="/notifications">
                <i className="fa fa-envelope"></i>
              </Link>
              <a href="#">
                <i className="fa fa-cog"></i>
                <span className="badge-sonar"></span>
              </a>
            </div>
          </nav>
        </Fragment>
      )}
    </Fragment>
  );
};

SideBar.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(SideBar);
