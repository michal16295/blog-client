import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../action/auth";
import { getNotifications, updateViewed } from "../../action/notifications";
import { unreadMsg } from "../../action/chat";
import { Feed, Icon, Comment, Form, Header } from "semantic-ui-react";
import Moment from "react-moment";
import "./navbar.css";

const NavBar = ({
  chat,
  unreadMsg,
  updateViewed,
  auth: { isAuthenticated, user },
  logout,
  getNotifications,
  notification: { loading, notViewed, AllCount, notifications },
}) => {
  useEffect(() => {
    getNotifications();
    unreadMsg();
  }, []);

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
  const dropdown = (
    <li className="dropdown">
      <a className="dropbtn">
        {!notViewed ||
          (notViewed !== 0 && (
            <span class="badge badge-danger ml-2">{notViewed}</span>
          ))}
        <i class="fas fa-bell"></i>
        <div className="dropdown-content">
          <Fragment>
            <p>
              <h6 className="header">
                Noifications <i class="fas fa-cog settings"></i>
              </h6>
            </p>

            <div class="dropdown-divider"></div>
            {notifications &&
              !loading &&
              notifications.length > 0 &&
              notifications.map((i) => (
                <Fragment>
                  <Link
                    onClick={() => updateViewed(i._id)}
                    to={`/${i.type}/${i.link}`}
                    className={`${i.isViewed}`}
                  >
                    {i.from + " " + i.content}

                    <Feed.Date>
                      <Moment fromNow>{i.date}</Moment>
                    </Feed.Date>
                  </Link>

                  <div class="dropdown-divider"></div>
                </Fragment>
              ))}
            <Link className="footer" to="/notifications">
              View All
            </Link>
          </Fragment>
        </div>
      </a>
    </li>
  );
  const authLink = (
    <ul>
      {dropdown}
      <li>
        <Link to="/chat">
          {!chat.notViewed ||
            (chat.notViewed !== 0 && (
              <span class="badge badge-danger ml-2">{chat.notViewed}</span>
            ))}
          <i class="fab fa-facebook-messenger"></i>
        </Link>
      </li>
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
    <nav className="navbar">
      <Link className="welcome" to="/">
        <i className="fas fa-code"></i> DevConnector{" "}
      </Link>
      {user && (
        <span className="user">
          <i className="fas fa-user"></i>
          {user.userName}{" "}
        </span>
      )}

      <div>
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
  updateViewed: PropTypes.func,
  unreadMsg: PropTypes.func,
  chat: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  notification: state.notification,
  chat: state.chat,
});
export default connect(mapStateToProps, {
  logout,
  getNotifications,
  updateViewed,
  unreadMsg,
})(NavBar);
