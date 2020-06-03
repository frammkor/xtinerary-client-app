import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = (props) => {
  const ifUser = props.auth.isAuthenticated
    ? `back ${props.auth.user.userName}`
    : "space traveler!";
  return (
    <div className="action-window center-column">
      <h1 className="home-title">
        Welcome
        {ifUser}
      </h1>
      <h5 className="home-description">
        Explore the galaxy, follow a path, or create your own adventure!
      </h5>
      <Link to="/cities" className="my-button">
        Jump to Hyperspace
      </Link>
      <Link to="/about" className="my-button">
        Learn about the App
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(Home);
