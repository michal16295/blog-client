import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import { getGroup, addMember } from "../../action/groups";
import GroupItem from "../groups/groupItem";
import GroupMembers from "./groupsMembers";
import AsyncSelect from "react-select/async";
import { getProfiles } from "../../action/users";

const GroupProfile = ({
  getProfiles,
  addMember,
  getGroup,
  group: { group, loading },
  auth,
  match,
  profile: { profiles }
}) => {
  const [formData, setFormData] = useState({
    query: "",
    member: "",
    scroll: 1
  });
  const { query, member, scroll } = formData;
  useEffect(() => {
    getGroup(match.params.id);
    getProfiles(scroll, query);
  }, []);

  const getUsers = query => {
    getProfiles(scroll, query);
    const userNames = profiles.map(u => u.userName);
    const res = userNames.map(p => ({
      value: p,
      label: p
    }));
    return res;
  };
  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(getUsers(inputValue));
    }, 0);
  };
  const handleInputChange = e => {
    setFormData({
      member: e.value
    });
  };
  const submitMember = e => {
    e.preventDefault();
    addMember(member, group._id);
  };

  return (
    <Fragment>
      {auth.user === null || group === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/groups" className="btn">
            Back To Groups
          </Link>
          <GroupItem group={group} buttonActions={false} />
          {auth.user.userName === group.owner && (
            <div className="row">
              <AsyncSelect
                className="col"
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                onChange={e => handleInputChange(e)}
              />
              <button
                onClick={e => submitMember(e)}
                className="btn btn-success col-3"
              >
                + Add Member
              </button>
            </div>
          )}
          <GroupMembers groupId={group._id} owner={group.owner} />
        </Fragment>
      )}
    </Fragment>
  );
};

GroupProfile.propTypes = {
  getGroup: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addMember: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, { getGroup, getProfiles, addMember })(
  GroupProfile
);
