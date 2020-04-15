import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile } from "../../action/users";
import Spinner from "../../common/Spinner";
import UserGroups from "./userGroups";
const UserProfile = ({
  getProfile,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfile(match.params.userName);
  }, []);
  const currentUser = false;

  return (
    <Fragment>
      {auth.user === null || profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="profile-grid my-1">
            <div className="profile-top bg-primary p-2">
              <img
                src={profile.avatar}
                alt="avatar"
                className="round-img my-1"
              />
              <h1 className="large">
                {profile.firstName + " " + profile.lastName}
              </h1>
              <p className="lead">{profile.userName}</p>

              <p className="lead">{profile.email}</p>
              <p>
                <Link
                  to={`/blogs/${profile.userName}/${currentUser}`}
                  className="btn btn-dark"
                >
                  Posts
                </Link>
                <Link to="/profiles" className="btn btn-dark">
                  Back To Profiles
                </Link>
                <button className="btn btn-danger">Block</button>
                {auth.user !== null &&
                  auth.loading === false &&
                  auth.user._id === profile._id && (
                    <Link to="/edit" className="btn btn-dark">
                      Edit Profile
                    </Link>
                  )}
              </p>
            </div>
          </div>
          <UserGroups userName={match.params.userName} />
        </Fragment>
      )}
    </Fragment>
  );
};

UserProfile.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfile })(UserProfile);
