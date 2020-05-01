import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../action/users";
import { createBlog, editBlog } from "../../action/blogs";
import { getGroups } from "../../action/groups";
import AsyncSelect from "react-select/async";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { Checkbox } from "semantic-ui-react";

const INIT_QUERY = "";
const SCROLL = 1;

const CreateBlog = ({
  blog,
  profile: { profiles },
  group: { groups },
  auth,
  getProfiles,
  getGroups,
  createBlog,
  match,
  editBlog,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    members: [],
    groupsArr: [],
    tags: [],
    permission: false,
  });
  const {
    title,
    description,
    page,
    tags,
    permission,
    members,
    groupsArr,
  } = formData;
  useEffect(() => {
    getProfiles(SCROLL, INIT_QUERY);
    getGroups(SCROLL, INIT_QUERY);
    if (match.params.edit === "true") {
      setFormData({
        ...formData,
        title: blog.blog.title,
        description: blog.blog.description,
        members: blog.users,
        groupsArr: blog.groups,
        tags: blog.blog.tags,
      });
    }
  }, [blog.blog.title]);
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handlePermission = (e) => {
    setFormData({
      ...formData,
      permission: !permission,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let blogData = {
      title,
      description,
      owner: auth.user.userName,
      permission: "public",
      tags,
    };
    if (permission) {
      blogData.permission = "private";
      blogData.members = members;
      blogData.groups = groupsArr;
    }
    if (match.params.edit === "false") createBlog(blogData);
    else {
      blogData.id = blog.blog._id;
      editBlog(blogData);
    }
  };
  const getUsers = (query) => {
    getProfiles(page, query);
    const userNames = profiles.map((u) => u.userName);
    const res = userNames.map((p) => ({
      value: p,
      label: p,
    }));
    return res;
  };
  const getGroupsPerm = (query) => {
    getGroups(page, query);
    const titles = groups.map((u) => u.title);
    const res = titles.map((p) => ({
      value: p,
      label: p,
    }));
    return res;
  };
  const loadUsers = (inputValue, callback) => {
    setTimeout(() => {
      callback(getUsers(inputValue));
    }, 0);
  };
  const loadGroups = (inputValue, callback) => {
    setTimeout(() => {
      callback(getGroupsPerm(inputValue));
    }, 0);
  };

  const handleInputChange = (e, field) => {
    if (e === null) return;
    const u = e.map((u) => u.value);
    setFormData({
      ...formData,
      [field]: u,
    });
  };

  const setTags = (newTags) => {
    setFormData({
      ...formData,
      tags: newTags,
    });
  };
  const inputFields = (
    <Fragment>
      <div>
        <AsyncSelect
          placeholder="Members Permissions"
          isMulti
          cacheOptions
          loadOptions={loadUsers}
          defaultValue={blog.users.map((p) => ({
            value: p,
            label: p,
          }))}
          name="members"
          onChange={(e) => handleInputChange(e, "members")}
        />
      </div>
      <p></p>
      <div>
        <AsyncSelect
          placeholder="Groups Permissions"
          isMulti
          cacheOptions
          defaultValue={blog.groups.map((p) => ({
            value: p,
            label: p,
          }))}
          loadOptions={loadGroups}
          name="groupArr"
          onChange={(e) => handleInputChange(e, "groupsArr")}
        />
      </div>
      <p></p>
    </Fragment>
  );
  return (
    <section className="container">
      <h1 className="large text-primary">New Post</h1>
      <p className="lead">
        <i className="fas fa-users"></i> Create A Post
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
        {match.params.edit === "false" && (
          <ReactTagInput
            tags={tags}
            onChange={(newTags) => setTags(newTags)}
            placeholder="tags"
          />
        )}
        <p></p>
        <Checkbox
          name="permission"
          label="Private"
          onChange={(e) => handlePermission(e)}
        />
        {permission && inputFields}
        <div>
          <input type="submit" className="btn btn-primary" value="Submit" />
          {match.params.edit === "true" && (
            <button
              onClick={() => {
                window.location = "/blogs";
              }}
              className="btn btn-danger"
            >
              Cancle
            </button>
          )}
        </div>
        <p></p>
      </form>
    </section>
  );
};

CreateBlog.propTypes = {
  auth: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  createBlog: PropTypes.func,
  blog: PropTypes.object,
  editBlog: PropTypes.func,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  blog: state.blog,
  group: state.group,
});
export default connect(mapStateToProps, {
  getProfiles,
  getGroups,
  createBlog,
  editBlog,
})(CreateBlog);
