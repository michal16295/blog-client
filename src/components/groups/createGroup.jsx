import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../action/users";
import { createGroup } from "../../action/groups";
import AsyncSelect from "react-select/async";

const SCROLL = 1;
const CreateGroup = ({
  profile: { profiles, loading, count, itemsPerPage },
  auth,
  getProfiles,
  createGroup,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    members: [],
  });
  const { title, description, members } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const groupData = {
      title,
      description,
      members,
      owner: auth.user.userName,
      ownerAvatar: auth.user.avatar,
    };
    createGroup(groupData);
  };
  const getUsers = (query) => {
    getProfiles(SCROLL, query);
    const userNames = profiles.map((u) => u.userName);
    const res = userNames.map((p) => ({
      value: p,
      label: p,
    }));
    return res;
  };
  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(getUsers(inputValue));
    }, 0);
  };

  const handleInputChange = (e) => {
    if (e === null) return;
    const u = e.map((u) => u.value);
    setFormData({
      ...formData,
      members: u,
    });
  };

  return (
    <section className="container">
      <h1 className="large text-primary">New Group</h1>
      <p className="lead">
        <i className="fas fa-users"></i> Create A Group
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <AsyncSelect
            placeholder="select members"
            defaultOptions
            isMulti
            cacheOptions
            loadOptions={loadOptions}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <p></p>
        <input type="submit" className="btn btn-primary" value="Create" />
        <p></p>
      </form>
    </section>
  );
};

CreateGroup.propTypes = {
  auth: PropTypes.object.isRequired,
  createGroup: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles, createGroup })(
  CreateGroup
);
