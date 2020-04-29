import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendMsg } from "../../action/chat";
import { getProfile } from "../../action/users";
import SentMessage from "./sentMessage";
import IncomingMessage from "./incomingMessage";
import ChatSocketServer from "../../services/socketService";
import ScrollToBottom from "react-scroll-to-bottom";
import "./chat.scss";

const Conversation = ({
  getProfile,
  reciever,
  isBlocked,
  sendMsg,
  auth: { user },
  chat: { messages, recentConvo, error },
  profile: { profile, loading },
}) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    ChatSocketServer.eventEmitter.on("add-message-response", sendMsg);
    ChatSocketServer.eventEmitter.on(
      "chat-list-user-logout",
      userLogoutInEvent
    );
    ChatSocketServer.eventEmitter.on("user-login-response", userLogoutInEvent);
  }, []);
  useEffect(() => {
    getProfile(reciever);
  }, [reciever]);

  const userLogoutInEvent = ({ error, userName }) => {
    getProfile(userName);
  };
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSend = (e) => {
    e.preventDefault();
    const data = {
      reciever,
      message,
      userName: user.userName,
    };
    ChatSocketServer.sendMessage(data);
    setMessage("");
  };

  return (
    <div className="mesgs">
      {profile && (
        <div className="bar">
          <h3>
            <img src={profile.avatar} alt="sunil" className="avatar" />
            {reciever} <i className={`status  + ${profile.online}`}></i>
          </h3>
        </div>
      )}
      <ScrollToBottom className="msg_history">
        <strong style={{ color: "red" }}>{error}</strong>
        {reciever === "" && <p>Choose A User</p>}
        {reciever !== "" &&
          messages &&
          messages.length > 0 &&
          messages.map((i) => (
            <Fragment key={i._id}>
              {i.from === user.userName ? (
                <SentMessage
                  userName={i.from}
                  date={i.date}
                  message={i.message}
                />
              ) : (
                <IncomingMessage
                  userName={i.from}
                  date={i.date}
                  message={i.message}
                />
              )}
            </Fragment>
          ))}
      </ScrollToBottom>
      <div className="type_msg">
        <div className="input_msg_write">
          <input
            type="text"
            className="write_msg"
            placeholder={isBlocked ? "THE USER IS BLOCKED" : "Type a message"}
            name="message"
            value={message}
            onChange={(e) => onChange(e)}
            disabled={isBlocked}
          />
          <button
            onClick={(e) => handleSend(e)}
            className="msg_send_btn"
            type="button"
          >
            <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
Conversation.propTypes = {
  auth: PropTypes.object,
  isBlocked: PropTypes.bool,
  sendMsg: PropTypes.func,
  chat: PropTypes.object,
  getProfile: PropTypes.func,
  profile: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
  profile: state.profile,
});
export default connect(mapStateToProps, { sendMsg, getProfile })(Conversation);
