import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../../action/auth";
import { Link } from "react-router-dom";
import UserGroups from "../profile/userGroups";
import "./profile.css";

const CurrentUser = ({ loadUser, auth: { user, loading } }) => {
  useEffect(() => {
    loadUser();
  }, [loading]);

  return loading || user == null ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <UserGroups userName={user.userName} currentUser={true} />
    </Fragment>
  );
};

CurrentUser.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { loadUser })(CurrentUser);
