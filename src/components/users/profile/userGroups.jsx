import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../../common/Spinner";
import { getUsersGroups } from "../../../action/groups";
import SearchBox from "../../../common/searchBox";
import Pagination from "../../../common/pagination";
import GroupItem from "./groupItem";

const UserGroups = ({
  getUsersGroups,
  group: { groups, loading, count, itemsPerPage },
  user,
  currentUser,
  match,
}) => {
  const [formData, setFormData] = useState({
    currentPage: 1,
    query: "",
    userName: user || match.params.userName,
  });
  const { currentPage, query, userName } = formData;
  useEffect(() => {
    getUsersGroups(currentPage, query, userName);
  }, []);

  const handlePageChange = (page) => {
    setFormData({
      ...formData,
      query: "",
      currentPage: page,
    });
    getUsersGroups(page, "", userName);
  };
  const handleSearch = (input) => {
    setFormData({
      ...formData,
      query: input,
      currentPage: 1,
    });
    getUsersGroups(currentPage, input, userName);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <SearchBox value={query} onChange={(input) => handleSearch(input)} />
          <div className="posts">
            {groups && groups.length > 0 ? (
              groups.map((group) => (
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
            onPageChange={(page) => handlePageChange(page)}
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
  user: PropTypes.string,
  currentUser: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  group: state.group,
  auth: state.auth,
});
export default connect(mapStateToProps, { getUsersGroups })(UserGroups);
