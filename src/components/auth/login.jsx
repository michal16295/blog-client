import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../action/alert";
import { login } from "../../action/auth";
import PropTypes from "prop-types";
import { googleSignUp } from "../../action/auth";

const Login = ({ login, isAuthenticated, googleSignUp }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    login(formData);
  };
  const onClick = () => {
    googleSignUp();
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <button onClick={() => onClick()} type="button" class="btn btn-gplus">
        <i className="fab fa-google-plus-g pr-1"></i> Sign Up With Google
      </button>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};
Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
  googleSignUp: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login, googleSignUp })(Login);
