import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { removeMember } from "../../action/groups";
import avatar from "../../img/avatar.png";
import { unblockUser } from "../../action/chat";

const ProfileItem = ({
  blocked,
  profile,
  groupMembers,
  groupId,
  removeMember,
  auth: { user, loading },
  unblockUser,
}) => {
  const handleRemove = () => {
    removeMember(groupId, profile.userName);
  };

  return (
    <div className="profile bg-light">
      <img src={profile.avatar || avatar} alt="avatar" />
      <div>
        <h2>{profile.firstName + " " + profile.lastName}</h2>
        <h2>{profile.userName}</h2>
        <p>{profile.email}</p>
        <p>
          <Link to={`/profile/${profile.userName}`} className="btn btn-primary">
            View Profile
          </Link>
          <Link
            to={`/blogs/${profile.userName}/false`}
            className="btn btn-primary"
          >
            Posts
          </Link>
          {groupId && !loading && profile.userName === user.userName && (
            <button
              onClick={(e) => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  handleRemove();
              }}
              className="btn btn-danger"
            >
              Exit
            </button>
          )}
          {groupMembers && (
            <button
              onClick={(e) => {
                if (
                  window.confirm("Are you sure you wish to delete this User?")
                )
                  handleRemove();
              }}
              className="btn btn-danger"
            >
              Remove
            </button>
          )}
          {blocked && (
            <button
              onClick={() => unblockUser(profile.userName)}
              className="btn btn-danger"
            >
              Unblock
            </button>
          )}
        </p>
      </div>
    </div>
  );
};
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  groupMembers: PropTypes.bool,
  groupId: PropTypes.string,
  removeMember: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  blocked: PropTypes.bool,
  unblockUser: PropTypes.func,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { removeMember, unblockUser })(
  ProfileItem
);
