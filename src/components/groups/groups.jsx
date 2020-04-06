import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile } from "../../action/users";
import Spinner from "../../common/Spinner";
import avatar from "../../img/avatar.png";
import { getGroups } from "../../action/groups";
import SearchBox from "../../common/searchBox";
import Pagination from "../../common/pagination";
import GroupItem from "../groups/groupItem";

const Groups = ({
  getGroups,
  group: { groups, loading, count, itemsPerPage }
}) => {
  const [formData, setFormData] = useState({
    currentPage: 1,
    query: ""
  });
  const { currentPage, query } = formData;
  useEffect(() => {
    getGroups();
  }, []);

  const handlePageChange = page => {
    setFormData({
      currentPage: page
    });
    getGroups(page);
  };
  const handleSearch = input => {
    setFormData({
      query: input,
      currentPage: 1
    });
    getGroups(currentPage, input);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Groups</h1>
          <p className="lead">
            <i className="fas fa-users"></i> Browse and Create Groups
          </p>
          <Link to="createGroup" className="btn btn-dark">
            Create Group
          </Link>
          <SearchBox value={query} onChange={input => handleSearch(input)} />
          <div className="posts">
            {groups.length > 0 ? (
              groups.map(group => (
                <GroupItem key={group._id} group={group} buttonActions={true} />
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

Groups.propTypes = {
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});
export default connect(mapStateToProps, { getGroups })(Groups);
