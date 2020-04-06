import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../action/alert";
import PropTypes from "prop-types";
import { getProfiles } from "../../action/users";
import ProfileItem from "./profileItem";
import Pagination from "../../common/pagination";
import SearchBox from "../../common/searchBox";
import Spinner from "../../common/Spinner";

const Profilies = ({
  getProfiles,
  profile: { profiles, loading, count, itemsPerPage }
}) => {
  const [formData, setFormData] = useState({
    currentPage: 1,
    query: ""
  });
  const { currentPage, query } = formData;
  useEffect(() => {
    getProfiles();
  }, []);
  const handlePageChange = page => {
    setFormData({
      currentPage: page
    });
    getProfiles(page);
  };
  const handleSearch = input => {
    setFormData({
      query: input,
      currentPage: 1
    });
    getProfiles(currentPage, input);
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Users</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            users
          </p>
          <SearchBox value={query} onChange={input => handleSearch(input)} />
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
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

Profilies.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { getProfiles })(Profilies);
