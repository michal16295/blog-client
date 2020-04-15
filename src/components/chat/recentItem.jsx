import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { getUserAvatar } from "../../action/users";
import { getNumUnreadMsgs } from "../../action/chat";
import "./chat.scss";

const RecentItem = ({
  profile: { loading, avatars },
  getNumUnreadMsgs,
  setChosenUser,
  user,
  getUserAvatar,
  date,
  chat,
}) => {
  useEffect(() => {
    getNumUnreadMsgs(user);
    getUserAvatar(user);
  }, []);

  return (
    <Fragment>
      <div className="chat_img">
        {" "}
        {!loading && <img src={avatars[user]} alt="sunil" />}{" "}
      </div>

      <h5
        style={{ cursor: "pointer", fontWeight: "bold" }}
        onClick={() => setChosenUser(user)}
      >
        {user}
        <Moment format="DD/MM" className="time_date">
          {date}
        </Moment>
      </h5>

      {chat && chat.notViewedPerUser[user] > 0 && (
        <span class="badge badge-danger ml-2 unread">
          {chat.notViewedPerUser[user]}
        </span>
      )}
    </Fragment>
  );
};
RecentItem.propTypes = {
  getUserAvatar: PropTypes.func.isRequired,
  user: PropTypes.string,
  date: PropTypes.string,
  setChosenUser: PropTypes.func,
  getNumUnreadMsgs: PropTypes.func,
  profile: PropTypes.object,
  chat: PropTypes.object,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  chat: state.chat,
});
export default connect(mapStateToProps, { getUserAvatar, getNumUnreadMsgs })(
  RecentItem
);
