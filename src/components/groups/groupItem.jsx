import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { groupDelete, editGroup } from "../../action/groups";
import { getUserAvatar } from "../../action/users";

const GroupItem = ({
  group,
  auth,
  groupDelete,
  buttonActions,
  editGroup,
  getUserAvatar,
  profile: { loading, avatars },
}) => {
  useEffect(() => {
    getUserAvatar(group.owner);
  }, []);

  const deleteItem = (e) => {
    groupDelete(e);
  };
  const [formData, setFormData] = useState({
    title: group.title,
    description: group.description,
    edit: false,
  });
  const { title, description, edit } = formData;
  const editAction = () => {
    setFormData({
      ...formData,
      edit: true,
    });
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newGroup = {
      groupId: group._id,
      title,
      description,
    };
    editGroup(newGroup);
  };
  const onCancle = () => {
    setFormData({
      ...formData,
      edit: false,
    });
  };
  const editForm = (
    <form className="form" onSubmit={(e) => onSubmit(e)}>
      <div className="form-group">
        <input
          placeholder="Title"
          type="text"
          value={title}
          name="title"
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="form-group">
        <input
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => onChange(e)}
          name="description"
        />
      </div>
      <input
        type="submit"
        className="btn btn-success"
        value="Submit"
        onChange={(e) => onChange(e)}
      />
      <button onClick={(e) => onCancle()} className="btn btn-danger">
        Cancle
      </button>
    </form>
  );
  return (
    <div className="post bg-white p-1 m-1">
      <div>
        {!loading && (
          <img src={avatars[group.owner]} alt="avatar" className="round-img" />
        )}
        <p></p>
        <span>{group.owner}</span>
        <p>
          <Link to={`/profile/${group.owner}`} className="btn btn-primary">
            View Profile
          </Link>
        </p>
      </div>
      <div>
        {!edit ? (
          <Fragment>
            {" "}
            <h4>{group.title}</h4>
            <p className="my-1">{group.description}</p>
          </Fragment>
        ) : (
          editForm
        )}

        <p className="post-date">
          Created on: <Moment>{group.date}</Moment>
        </p>
        <p></p>
        <span>
          {buttonActions && (
            <Link to={`/group/${group._id}`} className="btn btn-primary">
              Group Details
            </Link>
          )}

          {auth &&
            !auth.loading &&
            group.owner === auth.user.userName &&
            !edit && (
              <Fragment>
                <button
                  onClick={(e) => {
                    if (
                      window.confirm(
                        "Are you sure you wish to delete this item?"
                      )
                    )
                      deleteItem(group._id);
                  }}
                  className="btn btn-danger"
                >
                  <i className="fas fa-times" />
                </button>
                <button
                  onClick={(e) => editAction()}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              </Fragment>
            )}
        </span>
      </div>
    </div>
  );
};
GroupItem.propTypes = {
  auth: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  groupDelete: PropTypes.func.isRequired,
  buttonActions: PropTypes.bool,
  editGroup: PropTypes.func,
  getUserAvatar: PropTypes.func,
  profile: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  groupDelete,
  editGroup,
  getUserAvatar,
})(GroupItem);
