import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile } from "../../../action/users";
import Spinner from "../../../common/Spinner";
import UserGroups from "./userGroups";
import { Tabs, Tab } from "react-bootstrap";
import UserPosts from "./userPosts";

const UserProfile = ({
  getProfile,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfile(match.params.userName);
  }, []);
  const [key, setKey] = useState("groups");
  const currentUser = false;

  return (
    <Fragment>
      {auth.user === null || profile === null || loading ? (
        <Spinner />
      ) : (
        <div className="w3-container w3-content container">
          <div className="w3-row">
            <div className="w3-col m3">
              <div class="w3-card w3-round w3-white">
                <div class="w3-container">
                  <h4 class="w3-center">{profile.userName} Profile</h4>
                  <p class="w3-center">
                    <img
                      src={profile.avatar}
                      class="w3-circle"
                      alt="Avatar"
                      className="avatar"
                    />
                  </p>
                  <hr />
                  <p>
                    <i class="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i>
                    {profile.firstName + " " + profile.lastName}
                  </p>
                  <p>
                    <i class="fa fa-home fa-fw w3-margin-right w3-text-theme"></i>
                    {profile.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="w3-col m7">
              <div class="w3-row-padding">
                <div class="w3-col m12">
                  <div class="w3-card w3-round w3-white">
                    <div class="w3-container w3-padding">
                      <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                      >
                        <Tab eventKey="groups" title="Groups">
                          <UserGroups user={match.params.userName} />
                        </Tab>

                        <Tab eventKey="posts" title="Posts">
                          <UserPosts
                            userName={match.params.userName}
                            avatar={profile.avatar}
                          />
                        </Tab>
                        <Tab eventKey="friends" title="Friends"></Tab>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w3-col m2">
              <div class="w3-card w3-round w3-white w3-center">
                <div class="w3-container">
                  <p>
                    <button class="w3-button w3-block w3-theme-l4">
                      <i class="fas fa-user-plus"></i> Add Friend
                    </button>
                  </p>
                </div>
              </div>
              <br />

              <div class="w3-card w3-round w3-white w3-center">
                <div class="w3-container">
                  {" "}
                  <p>
                    <button class="w3-button w3-block w3-theme-l4">
                      <i class="fas fa-envelope"></i> Message
                    </button>
                  </p>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
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
