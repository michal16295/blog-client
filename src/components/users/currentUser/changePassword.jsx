import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changePass } from "../../../action/auth";
import { Button, Checkbox, Form, Input } from "semantic-ui-react";

const ChangePass = ({ changePass, auth: { user, loading } }) => {
  const [formData, setFormData] = useState({
    oldPass: "",
    newPass: "",
  });
  const { newPass, oldPass } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    changePass(user._id, formData);
  };

  return loading || user == null ? (
    <div>Loading...</div>
  ) : (
    <Form className="container">
      <h2>Change Password</h2>
      <Form.Field>
        <label>Old Password</label>
        <Input
          icon="lock"
          type="password"
          placeholder="Current Password"
          name="oldPass"
          value={oldPass}
          onChange={(e) => onChange(e)}
        />
      </Form.Field>
      <Form.Field>
        <label>New Password</label>
        <Input
          icon="lock"
          type="password"
          placeholder="New Password"
          name="newPass"
          value={newPass}
          onChange={(e) => onChange(e)}
        />
      </Form.Field>
      <Button onClick={(e) => onSubmit(e)} type="submit">
        Submit
      </Button>
    </Form>
  );
};
ChangePass.propTypes = {
  changePass: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { changePass })(ChangePass);
