import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Feed, Icon, Comment, Form, Header } from "semantic-ui-react";
import { getNotifications } from "../../action/notifications";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import NotificationItem from "./notificationItem";

const Notifications = ({
  getNotifications,
  notification: { notifications, AllCount },
}) => {
  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <Comment.Group className="container">
      <Header as="h3" dividing>
        Notifications
      </Header>
      <Feed>
        {notifications &&
          notifications.length > 0 &&
          notifications.map((i) => <NotificationItem key={i._id} data={i} />)}
      </Feed>
    </Comment.Group>
  );
};
Notifications.propTypes = {
  auth: PropTypes.object.isRequired,
  getNotifications: PropTypes.func.isRequired,
  notification: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  notification: state.notification,
});
export default connect(mapStateToProps, {
  getNotifications,
})(Notifications);
