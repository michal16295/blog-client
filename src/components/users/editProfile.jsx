import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../action/auth";
import { editUser, getRandomAvatar } from "../../action/users";

const EditUser = ({
  editUser,
  getRandomAvatar,
  loadUser,
  auth: { user, loading },
}) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatar: user.avatar,
  });
  const { firstName, lastName, email, avatar } = formData;
  useEffect(() => {
    loadUser();
  }, [loading]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    editUser(user._id, formData);
  };
  const handleAvatar = async (e) => {
    e.preventDefault();
    const newAvatar = await getRandomAvatar();
    setFormData({
      ...formData,
      avatar: newAvatar,
    });
    console.log(avatar);
  };
  const handleCancle = () => {
    window.location = "/currentUser";
  };
  return loading || user == null ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <h1 className="large text-primary">Edit User</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <img
          src={avatar}
          alt="avatar"
          className="avatar"
          name="avatar"
          value={avatar}
        />
        <div className="form-group">
          <input
            className="col"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => onChange(e)}
          />

          <input
            type="text"
            placeholder={user.email}
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button className="btn btn-dark" onClick={(e) => handleAvatar(e)}>
          Random Avatar
        </button>
        <button className="btn btn-danger" onClick={(e) => handleCancle()}>
          Cancle
        </button>
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </Fragment>
  );
};
EditUser.propTypes = {
  loadUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getRandomAvatar: PropTypes.func,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  loadUser,
  editUser,
  getRandomAvatar,
})(EditUser);
