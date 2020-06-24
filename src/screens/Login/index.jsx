import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import googleButton from "../../img/common/btn_google_signin_dark_normal_web.png";
import googleButtonHovered from "../../img/common/btn_google_signin_dark_pressed_web.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nameOrEmail: "",
      password: "",
      errors: {},
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to
    // dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      nameOrEmail: this.state.nameOrEmail,
      password: this.state.password,
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  render() {
    const logWithGoogle = () => {
      window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
    };
    const { errors } = this.state;
    const onMouseEnterHandler = () => {
      document.getElementById("logGoogle").src = googleButtonHovered;
    };
    const onMouseLeaveHandler = () => {
      document.getElementById("logGoogle").src = googleButton;
    };
    return (
      <div className="action-window center-column">
        <div className="center-column">
          <div>
            <h4>
              <b>Login</b>
            </h4>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <label htmlFor="nameOrEmail">User Name or Email</label>
            <span className="red-text">
              {errors.nameOrEmail}
              {errors.emailnotfound}
            </span>
            <div className="input-textarea center-column">
              <input
                onChange={this.handleChange}
                value={this.state.nameOrEmail}
                error={errors.nameOrEmail}
                id="nameOrEmail"
                type="email"
                className={classnames("", {
                  invalid: errors.nameOrEmail || errors.emailnotfound,
                })}
              />
            </div>
            <label htmlFor="password">Password</label>
            <span className="red-text">
              {errors.password}
              {errors.passwordincorrect}
            </span>
            <div className="input-textarea">
              <input
                onChange={this.handleChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect,
                })}
              />
            </div>
            <button type="submit" className="my-button match-google">
              Login
            </button>
          </form>
          <img
            alt="loginGoogle"
            id="logGoogle"
            onMouseLeave={onMouseLeaveHandler}
            onMouseEnter={onMouseEnterHandler}
            src={googleButton}
            onClick={logWithGoogle}
          />
        </div>
        <small className="grey-text text-darken-1">
          <Link to="/register">Click here to register</Link>
        </small>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ auth: state.auth, errors: state.errors });
export default connect(mapStateToProps, { loginUser })(Login);
