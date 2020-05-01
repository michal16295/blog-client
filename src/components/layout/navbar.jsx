import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../action/auth";
import {
  getNotifications,
  updateViewed,
  setViewedAll,
} from "../../action/notifications";
import { unreadMsg } from "../../action/chat";
import { Feed } from "semantic-ui-react";
import ChatSocketServer from "../../services/socketService";
import { Checkbox } from "semantic-ui-react";
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
  setViewedAll,
}) => {
  useEffect(() => {
    ChatSocketServer.eventEmitter.on("add-message-response", handleUnreadMsgs);
    ChatSocketServer.eventEmitter.on(
      "user-notification-response",
      handleNotifications
    );
    getNotifications();
    unreadMsg();
  }, []);
  const [markAll, setMarkAll] = useState(false);

  const handleUnreadMsgs = (data) => {
    unreadMsg();
  };
  const handleNotifications = (data) => {
    getNotifications();
  };
  const handleCheckAll = (e, data) => {
    setMarkAll(data.checked);
    setViewedAll();
  };
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
      <i className="bell">
        {!notViewed ||
          (notViewed !== 0 && (
            <span className="badge badge-danger ml-2">{notViewed}</span>
          ))}
        <i className="fas fa-bell"></i>
        <div className="dropdown-content">
          <Fragment>
            <Fragment>
              <h6 className="header">
                Noifications{" "}
                <Link
                  className="fas fa-cog settings"
                  to="/settings/notifications"
                ></Link>
                <Checkbox
                  name="markAll"
                  onChange={(e, data) => handleCheckAll(e, data)}
                  slider
                />
              </h6>
            </Fragment>

            <div className="dropdown-divider"></div>
            {notifications &&
              !loading &&
              notifications.length > 0 &&
              notifications.map((i) => (
                <Fragment key={i._id}>
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

                  <div className="dropdown-divider"></div>
                </Fragment>
              ))}
            <Link className="footer" to="/notifications">
              View All
            </Link>
          </Fragment>
        </div>
      </i>
    </li>
  );
  const authLink = (
    <ul>
      {dropdown}
      <li>
        <Link to="/chat">
          {!chat.notViewed ||
            (chat.notViewed !== 0 && (
              <span className="badge badge-danger ml-2">{chat.notViewed}</span>
            ))}
          <i className="fab fa-facebook-messenger"></i>
        </Link>
      </li>
      <li>
        {user && <Link to={`/userGroups/${user.userName}`}>My Profile</Link>}
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
        <a onClick={() => logout(user.userName)} href="#!">
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
  setViewedAll: PropTypes.func,
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
  setViewedAll,
})(NavBar);
