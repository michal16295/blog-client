import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../action/users";
import { sendMsg, getMsgs, recentConve } from "../../action/chat";
import RecentItem from "./recentItem";
import "./chat.scss";
import SentMessage from "./sentMessage";
import IncomingMessage from "./incomingMessage";

const Chat = ({
  recentConve,
  getMsgs,
  sendMsg,
  getProfiles,
  auth: { user },
  profile: { profiles },
  chat: { messages, recentConvo, error },
}) => {
  const [formData, setFormData] = useState({
    currentPage: 1,
    query: "",
    message: "",
    reciever: "",
    loadMore: 1,
    isBlocked: false,
  });
  const {
    currentPage,
    query,
    reciever,
    message,
    loadMore,
    isBlocked,
  } = formData;
  useEffect(() => {
    recentConve();
  }, [reciever]);

  const setChosenUser = (userName) => {
    const index = recentConvo.findIndex(
      (obj) => obj.user1 === userName || obj.user2 === userName
    );
    setFormData({
      ...formData,
      reciever: userName,
      message: "",
      isBlocked: recentConvo[index].isBlocked,
    });
    getMsgs(userName, loadMore);
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSend = (e) => {
    e.preventDefault();
    const data = {
      reciever,
      message,
    };
    sendMsg(data);
    setFormData({
      ...formData,
      message: "",
    });
  };
  const handleSearch = (e) => {
    setFormData({
      ...formData,
      query: e.target.value,
      currentPage: 1,
    });
    getProfiles(currentPage, e.target.value);
  };
  const newConversations = (
    <Fragment>
      {profiles &&
        profiles.length > 0 &&
        profiles.map((i) => (
          <div
            key={i._id}
            onClick={() => setChosenUser(i.userName)}
            style={{ cursor: "pointer" }}
            className="chat_list"
          >
            <div className="chat_people">
              <div className="chat_img">
                {" "}
                <img src={i.avatar} alt="sunil" />{" "}
              </div>

              <h5 style={{ fontWeight: "bold" }}>{i.userName}</h5>
            </div>
          </div>
        ))}
    </Fragment>
  );
  const recenteConversations = (
    <Fragment>
      {recentConvo &&
        recentConvo.length > 0 &&
        recentConvo.map((i) => (
          <div key={i._id} className="chat_list">
            <div className="chat_people">
              <div className="chat_ib">
                {user && i.user1 !== user.userName && (
                  <RecentItem
                    data={i}
                    user={i.user1}
                    setChosenUser={(userName) => setChosenUser(userName)}
                  />
                )}
                {user && i.user1 === user.userName && (
                  <RecentItem
                    user={i.user2}
                    data={i}
                    setChosenUser={(userName) => setChosenUser(userName)}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
    </Fragment>
  );
  return (
    <div className="container">
      <div className="messaging">
        <div className="inbox_msg">
          <div className="inbox_people">
            <div className="headind_srch">
              <div className="recent_heading">
                <h4>Recent</h4>
              </div>
              <div className="srch_bar">
                <div className="stylish-input-group">
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Search Users"
                    value={query}
                    name="query"
                    onChange={(e) => handleSearch(e)}
                  />
                  <span className="input-group-addon">
                    <button type="button">
                      {" "}
                      <i className="fa fa-search" aria-hidden="true"></i>{" "}
                    </button>
                  </span>{" "}
                </div>
              </div>
            </div>
            <div className="inbox_chat">
              {query !== "" ? newConversations : recenteConversations}
            </div>
          </div>
          <div className="mesgs">
            <div className="msg_history">
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
            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <input
                  type="text"
                  className="write_msg"
                  placeholder={
                    isBlocked ? "THE USER IS BLOCKED" : "Type a message"
                  }
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
        </div>
      </div>
    </div>
  );
};
Chat.propTypes = {
  isAuthenticated: PropTypes.bool,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  sendMsg: PropTypes.func.isRequired,
  getMsgs: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  recentConve: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  chat: state.chat,
});
export default connect(mapStateToProps, {
  getProfiles,
  sendMsg,
  getMsgs,
  recentConve,
})(Chat);
