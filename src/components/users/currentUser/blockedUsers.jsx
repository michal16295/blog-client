import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBlockedUsers } from "../../../action/chat";
import "./profile.css";
import { Button, Checkbox, Form, Input } from "semantic-ui-react";
import ProfileItem from "./../profileItem";
import Spinner from "../../../common/Spinner";

const BlockedUsers = ({
  chat: { error, users, loading },
  getBlockedUsers,
  auth,
}) => {
  const [formData, setFormData] = useState({});
  const {} = formData;

  useEffect(() => {
    getBlockedUsers();
  }, []);

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
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});
export default connect(mapStateToProps, {
  getBlockedUsers,
})(BlockedUsers);
