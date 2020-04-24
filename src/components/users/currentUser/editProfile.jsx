import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../../action/auth";
import { editUser, getRandomAvatar } from "../../../action/users";
import "./profile.css";
import { Button, Checkbox, Form, Input } from "semantic-ui-react";

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
    <Form className="container">
      <h2>Edit Profile</h2>
      <Form.Field>
        <img
          src={avatar}
          alt="avatar"
          className="avatar"
          name="avatar"
          value={avatar}
        />
      </Form.Field>
      <Form.Field>
        <label>First Name</label>
        <input
          className="col"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => onChange(e)}
        />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => onChange(e)}
        />
      </Form.Field>{" "}
      <Form.Field>
        <label>Email</label>
        <Input
          type="text"
          placeholder={user.email}
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
      </Form.Field>
      <Button onClick={(e) => handleAvatar(e)}>Random Avatar</Button>
      <Button onClick={(e) => onSubmit(e)} type="submit">
        Submit
      </Button>
      <Button color="red" onClick={(e) => handleCancle()}>
        Cancel
      </Button>
    </Form>
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
