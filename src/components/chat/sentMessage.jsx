import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { getUserAvatar } from "../../action/users";
import { getNumUnreadMsgs } from "../../action/chat";
import "./chat.scss";

const SentMessage = ({
  profile: { loading, avatars },
  message,
  userName,
  getUserAvatar,
  date,
}) => {
  useEffect(() => {
    getUserAvatar(userName);
  }, []);

  return (
    <div className="outgoing_msg">
      {" "}
      <div className="outgoing_msg_img">
        {" "}
        {!loading && <img src={avatars[userName]} alt="sunil" />}{" "}
      </div>
      <div className="sent_msg">
        <p>{message}</p>
        <Moment className="time_date" format="DD/MM/YYYY HH:mm">
          {date}
        </Moment>{" "}
      </div>
    </div>
  );
};
SentMessage.propTypes = {
  auth: PropTypes.object,
  getUserAvatar: PropTypes.func.isRequired,
  userName: PropTypes.string,
  date: PropTypes.string,
  message: PropTypes.string,
  profile: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserAvatar, getNumUnreadMsgs })(
  SentMessage
);
