import React, { Component } from "react";
import { connect } from "react-redux";
import { googleLogin } from "../actions/authActions";

class HandleGoogleLogin extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    this.props.googleLogin(this.props.match.params.token);
  }

  render() {
    return <h1>Login you with Google</h1>;
  }
}
const mapStateToProps = (state) => ({ auth: state.auth, errors: state.errors });
export default connect(mapStateToProps, { googleLogin })(HandleGoogleLogin);
