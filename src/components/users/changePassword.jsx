import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../action/auth";

import { changePass } from "../../action/auth";

const ChangePass = ({ changePass, loadUser, auth: { user, loading } }) => {
  const [formData, setFormData] = useState({
    oldPass: "",
    newPass: ""
  });
  const { newPass, oldPass } = formData;
  useEffect(() => {
    loadUser();
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    changePass(user._id, formData);
  };

  return loading || user == null ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <h1 className="large text-primary">Change Password</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="password"
            placeholder="Current Password"
            name="oldPass"
            value={oldPass}
            onChange={e => onChange(e)}
          />

          <input
            type="password"
            placeholder="New Password"
            name="newPass"
            value={newPass}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </Fragment>
  );
};
ChangePass.propTypes = {
  loadUser: PropTypes.func.isRequired,
  changePass: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { loadUser, changePass })(ChangePass);
