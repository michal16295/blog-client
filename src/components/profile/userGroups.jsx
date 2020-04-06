import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import { getUsersGroups } from "../../action/groups";
import SearchBox from "../../common/searchBox";
import Pagination from "../../common/pagination";
import GroupItem from "./groupItem";

const UserGroups = ({
  getUsersGroups,
  group: { groups, loading, count, itemsPerPage },
  userName,
  currentUser
}) => {
  const [formData, setFormData] = useState({
    currentPage: 1,
    query: ""
  });
  const { currentPage, query } = formData;
  useEffect(() => {
    getUsersGroups(currentPage, query, userName);
  }, []);

  const handlePageChange = page => {
    setFormData({
      currentPage: page
    });
    getUsersGroups(page, query, userName);
  };
  const handleSearch = input => {
    setFormData({
      query: input,
      currentPage: 1
    });
    getUsersGroups(currentPage, input, userName);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <p className="lead text-primary">Groups</p>
          <SearchBox value={query} onChange={input => handleSearch(input)} />
          <div className="posts">
            {groups.length > 0 ? (
              groups.map(group => (
                <GroupItem
                  key={group._id}
                  group={group}
                  userName={userName}
                  currentUser={currentUser}
                />
              ))
            ) : (
              <h4>No Groups Found...</h4>
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

UserGroups.propTypes = {
  getUsersGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  userName: PropTypes.string,
  currentUser: PropTypes.bool
};
const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});
export default connect(mapStateToProps, { getUsersGroups })(UserGroups);
