import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import { getGroupMembers } from "../../action/groups";
import SearchBox from "../../common/searchBox";
import Pagination from "../../common/pagination";
import ProfileItem from "../users/profileItem";

const GroupMembers = ({
  getGroupMembers,
  group: { users, loading, count, itemsPerPage },
  groupId,
  owner,
  auth
}) => {
  const [formData, setFormData] = useState({
    currentPage: 1,
    query: ""
  });
  const { currentPage, query } = formData;
  useEffect(() => {
    getGroupMembers(currentPage, query, groupId);
  }, []);

  const handlePageChange = page => {
    setFormData({
      currentPage: page
    });
    getGroupMembers(page, query, groupId);
  };
  const handleSearch = input => {
    setFormData({
      query: input,
      currentPage: 1
    });
    getGroupMembers(currentPage, input, groupId);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <p className="lead text-primary">Members</p>
          <SearchBox value={query} onChange={input => handleSearch(input)} />
          <div className="profiles">
            {users.length > 0 ? (
              users.map(profile => (
                <ProfileItem
                  key={profile.userName}
                  profile={profile}
                  groupId={groupId}
                  groupMembers={auth.user.userName === owner}
                />
              ))
            ) : (
              <h4>No Profiles Found...</h4>
            )}
          </div>
          <Pagination
            itemsCount={count}
            currentPage={currentPage}
            onPageChange={page => handlePageChange(page)}
            pageSize={itemsPerPage}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

GroupMembers.propTypes = {
  getGroupMembers: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  groupId: PropTypes.string,
  owner: PropTypes.string
};
const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});
export default connect(mapStateToProps, { getGroupMembers })(GroupMembers);
