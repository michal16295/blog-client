import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { getUserAvatar } from "../../action/users";
import { getNumUnreadMsgs } from "../../action/chat";
import "./chat.scss";

const IncomingMessage = ({
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
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        {" "}
        {!loading && (
          <img src={avatars[userName]} alt="sunil" className="incomeAvatar" />
        )}{" "}
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{message}</p>
          <Moment className="time_date" format="DD/MM/YYYY HH:mm">
            {date}
          </Moment>{" "}
        </div>
      </div>
    </div>
  );
};
IncomingMessage.propTypes = {
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
  IncomingMessage
);
