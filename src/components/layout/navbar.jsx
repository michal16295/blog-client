import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../action/auth";

const NavBar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const guestLinks = (
    <ul>
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fas fa-sign-in-alt"> </i> Login
        </Link>
      </li>
    </ul>
  );

  const authLink = (
    <ul>
      <li>
        <Link to="/currentUser">My Profile</Link>
      </li>
      <li>
        <Link to="/profiles">Users</Link>
      </li>
      <li>
        <Link to="/groups">Groups</Link>
      </li>
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </a>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && user && <h5>Welcome {user.userName}</h5>}
      <ul>
        <Fragment>{isAuthenticated ? authLink : guestLinks}</Fragment>
      </ul>
    </nav>
  );
};
NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(NavBar);
