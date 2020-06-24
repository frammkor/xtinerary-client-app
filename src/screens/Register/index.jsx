import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import googleButton from "../../img/common/btn_google_signin_dark_normal_web.png";
import googleButtonHovered from "../../img/common/btn_google_signin_dark_pressed_web.png";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      email: "",
      password: "",
      password2: "",
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
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
            <h4 className="some" id="some">
              <b>Sign Up</b>
            </h4>
          </div>
          <form noValidate onSubmit={this.onSubmit} className="center-column">
            <label htmlFor="userName">userName</label>
            <span className="">{errors.userName}</span>
            <div className="input-textarea">
              <input
                onChange={this.onChange}
                value={this.state.userName}
                error={errors.userName}
                id="userName"
                type="text"
                className={classnames("", { invalid: errors.userName })}
              />
            </div>
            <label htmlFor="email">Email</label>
            <span className="">{errors.email}</span>
            <div className="input-textarea">
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", { invalid: errors.email })}
              />
            </div>
            <label htmlFor="password">Password</label>
            <span className="">{errors.password}</span>
            <div className="input-textarea">
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", { invalid: errors.password })}
              />
            </div>
            <label htmlFor="password2">Confirm Password</label>
            <span className="">{errors.password2}</span>
            <div className="input-textarea">
              <input
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                className={classnames("", { invalid: errors.password2 })}
              />
            </div>
            <button type="submit" className="my-button match-google">
              Sign up
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
        <small className="">
          <Link to="/login">Click here to login</Link>
        </small>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ auth: state.auth, errors: state.errors });
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
