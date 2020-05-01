import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBlockedUsers, unblockUser } from "../../../action/chat";
import "./profile.css";
import ProfileItem from "./../profileItem";
import Spinner from "../../../common/Spinner";
import ChatSocketServer from "./../../../services/socketService";

const BlockedUsers = ({
  chat: { error, users, loading },
  getBlockedUsers,
  auth,
  unblockUser,
}) => {
  useEffect(() => {
    ChatSocketServer.eventEmitter.on("user-block-response", handleToggleBlock);
    getBlockedUsers();
  }, []);
  const handleToggleBlock = (data) => {
    unblockUser(data);
  };
  return (
    <Fragment>
      <h2>Blocked Users</h2>
      {loading ? (
        <Spinner />
      ) : users && users.length > 0 ? (
        users.map((profile) => (
          <ProfileItem key={profile._id} profile={profile} blocked={true} />
        ))
      ) : (
        <strong style={{ color: "red" }}>No Blocked Users</strong>
      )}
    </Fragment>
  );
};
BlockedUsers.propTypes = {
  auth: PropTypes.object.isRequired,
  getBlockedUsers: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  unblockUser: PropTypes.func,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});
export default connect(mapStateToProps, {
  getBlockedUsers,
  unblockUser,
})(BlockedUsers);
