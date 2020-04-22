import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { getUserAvatar } from "../../action/users";
import { getNumUnreadMsgs, blockUser, unblockUser } from "../../action/chat";
import "./chat.scss";
import blocked from "../../img/blocked.png";

const RecentItem = ({
  profile: { loading, avatars },
  unblockUser,
  getNumUnreadMsgs,
  setChosenUser,
  user,
  getUserAvatar,
  chat,
  data,
  blockUser,
  auth,
}) => {
  const [formData, setFormData] = useState({
    isBlocked: data.isBlocked,
  });
  const { isBlocked } = formData;

  useEffect(() => {
    getNumUnreadMsgs(user);
    getUserAvatar(user);
  }, []);

  const block = (user) => {
    setFormData({
      ...formData,
      isBlocked: !isBlocked,
    });
    blockUser(user);
  };
  const unblock = (user) => {
    setFormData({
      ...formData,
      isBlocked: !isBlocked,
    });
    unblockUser(user);
  };

  return (
    <Fragment>
      <div className="chat_img">
        {" "}
        {!loading && !isBlocked && <img src={avatars[user]} alt="sunil" />}{" "}
        {!loading && isBlocked && <img src={blocked} alt="sunil" />}{" "}
      </div>

      <h5
        style={{ cursor: "pointer", fontWeight: "bold" }}
        onClick={() => setChosenUser(user)}
      >
        {user}
        <Moment format="DD/MM" className="time_date">
          {data.date}
        </Moment>
      </h5>

      {chat && chat.notViewedPerUser[user] > 0 && (
        <span class="badge badge-danger ml-2 unread">
          {chat.notViewedPerUser[user]}
        </span>
      )}
      <p>{data.message}</p>
      <li className="drop settings">
        <i className="fas fa-ellipsis-h " />
        <div className="drop-content">
          {isBlocked ? (
            data.blocker === auth.user.userName ? (
              <a onClick={() => unblock(user)}>Unblock User</a>
            ) : (
              <a style={{ cursor: "auto" }}>You Are Blocked</a>
            )
          ) : (
            <a onClick={() => block(user)}>Block User</a>
          )}
        </div>
      </li>
    </Fragment>
  );
};
RecentItem.propTypes = {
  getUserAvatar: PropTypes.func.isRequired,
  user: PropTypes.string,
  data: PropTypes.object,
  setChosenUser: PropTypes.func,
  getNumUnreadMsgs: PropTypes.func,
  profile: PropTypes.object,
  chat: PropTypes.object,
  blockUser: PropTypes.func,
  unblockUser: PropTypes.func,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  chat: state.chat,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getUserAvatar,
  getNumUnreadMsgs,
  blockUser,
  unblockUser,
})(RecentItem);
