import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../action/auth";
import { getNotifications, updateViewed } from "../../action/notifications";

const NavBar = ({
  updateViewed,
  auth: { isAuthenticated, user },
  logout,
  getNotifications,
  notification: { loading, notViewed, AllCount, notifications }
}) => {
  useEffect(() => {
    getNotifications();
  }, []);

  const guestLinks = (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link to="/blogs">Blogs</Link>
      </li>
      <li className="nav-item active">
        <Link to="/register">Register</Link>
      </li>
      <li className="nav-item active">
        <Link to="/login">
          <i className="fas fa-sign-in-alt"> </i> Login
        </Link>
      </li>
    </ul>
  );
  const dropdown = (
    <li className="nav-item dropdown">
      <a
        onClick={() => updateViewed()}
        className="nav-link "
        href="#"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {!notViewed ||
          (notViewed !== 0 && (
            <span class="badge badge-danger ml-2">{notViewed}</span>
          ))}
        <i class="fas fa-bell"></i>
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <h6 class="dropdown-header">Notifications</h6>
        {notifications &&
          !loading &&
          notifications.length > 0 &&
          notifications.map(i => (
            <Fragment>
              <div class="dropdown-divider"></div>
              <Link
                style={{ color: "gray" }}
                to={`/${i.type}/${i.link}`}
                className="dropdown-item"
              >
                {i.from + " " + i.content}
              </Link>
            </Fragment>
          ))}
        <div class="dropdown-divider"></div>
        <Link
          to="/notifications"
          class="dropdown-header"
          style={{ color: "black" }}
        >
          View All
        </Link>
      </div>
    </li>
  );
  const authLink = (
    <ul className="navbar-nav ml-auto dropleft">
      {dropdown}
      <li className="nav-item active">
        <Link to="/currentUser">My Profile</Link>
      </li>
      <li className="nav-item active">
        <Link to="/profiles">Users</Link>
      </li>
      <li className="nav-item active">
        <Link to="/groups">Groups</Link>
      </li>
      <li className="nav-item active">
        <Link to="/blogs">Blogs</Link>
      </li>
      <li className="nav-item active">
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </a>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <i className="fas fa-code"></i> DevConnector
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Fragment>{isAuthenticated ? authLink : guestLinks}</Fragment>
      </div>
    </nav>
  );
};
NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired,
  notification: PropTypes.object,
  updateViewed: PropTypes.func
};
const mapStateToProps = state => ({
  auth: state.auth,
  notification: state.notification
});
export default connect(mapStateToProps, {
  logout,
  getNotifications,
  updateViewed
})(NavBar);
