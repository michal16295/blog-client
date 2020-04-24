import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { groupDelete, removeMember } from "../../../action/groups";
import { getUserAvatar } from "../../../action/users";

const GroupItem = ({
  profile: { loading, avatars },
  getUserAvatar,
  group,
  auth,
  groupDelete,
  userName,
  removeMember,
  currentUser,
}) => {
  useEffect(() => {
    getUserAvatar(group.owner);
  }, []);

  const deleteItem = (e) => {
    groupDelete(e);
  };
  const handleExit = () => {
    removeMember(group._id, auth.user.userName);
  };
  return (
    <div className="post bg-white p-1 m-1">
      <div>
        {!loading && <img src={avatars[group.owner]} alt="avatar" />}
        <p></p>
        <span>{group.owner}</span>
      </div>
      <div>
        <h4>{group.title}</h4>
        <p className="post-date">
          Created on: <Moment>{group.date}</Moment>
        </p>
        <p>
          <Link to={`/group/${group._id}`} className="btn btn-primary">
            Group Details
          </Link>
          {!auth.loading && group.owner === auth.user.userName && (
            <button
              onClick={(e) => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  deleteItem(group._id);
              }}
              className="btn btn-danger"
            >
              Delete Group
            </button>
          )}
          {!auth.loading && group.owner !== auth.user.userName && currentUser && (
            <button onClick={(e) => handleExit()} className="btn btn-danger">
              Exit
            </button>
          )}
          {group.owner === userName && (
            <span>
              <i className="fas fa-user" /> owner
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
GroupItem.propTypes = {
  auth: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  groupDelete: PropTypes.func.isRequired,
  userName: PropTypes.string,
  removeMember: PropTypes.func.isRequired,
  currentUser: PropTypes.bool,
  getUserAvatar: PropTypes.func,
  profile: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  groupDelete,
  removeMember,
  getUserAvatar,
})(GroupItem);
