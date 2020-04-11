import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Feed, Icon, Comment, Form, Header } from "semantic-ui-react";
import { getNotifications } from "../../action/notifications";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const Notifications = ({
  getNotifications,
  notification: { notifications, AllCount }
}) => {
  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Notifications
      </Header>
      <Feed>
        {notifications &&
          notifications.length > 0 &&
          notifications.map(i => (
            <Feed.Event>
              <Feed.Label>
                <img src={i.senderAvatar} />
              </Feed.Label>
              <Feed.Content>
                <Link to={`/${i.type}/${i.link}`}>
                  <Feed.Summary>
                    <Link style={{ color: "blue" }} to={`/profile/${i.from}`}>
                      {i.from}
                    </Link>{" "}
                    {i.content + " - " + i.title}
                    <Feed.Date>
                      <Moment fromNow>{i.date}</Moment>
                    </Feed.Date>
                  </Feed.Summary>
                  <Feed.Meta></Feed.Meta>
                </Link>
              </Feed.Content>
            </Feed.Event>
          ))}
      </Feed>
    </Comment.Group>
  );
};
Notifications.propTypes = {
  auth: PropTypes.object.isRequired,
  getNotifications: PropTypes.func.isRequired,
  notification: PropTypes.object
};
const mapStateToProps = state => ({
  auth: state.auth,
  notification: state.notification
});
export default connect(mapStateToProps, {
  getNotifications
})(Notifications);
