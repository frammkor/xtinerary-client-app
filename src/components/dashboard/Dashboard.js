import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getFavorites } from "../../actions/favoritesActions";

class Dashboard extends Component {
  componentWillMount() {
    this.props.getFavorites(this.props.auth.user.id);
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="action-window">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b>
              {user.userName.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span
                  style={{
                    fontFamily: "monospace",
                  }}
                >
                  MERN
                </span>
                app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps, { logoutUser, getFavorites })(
  Dashboard
);
