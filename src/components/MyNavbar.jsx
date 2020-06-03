import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FaUserAstronaut } from "react-icons/fa";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { clearFavorites } from "../actions/favoritesActions";

const MyNavbar = (props) => {
  useEffect(() => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
    burger.addEventListener("click", () => {
      // Toggle Nav
      nav.classList.toggle("nav-active");
      // Burger Animation
      burger.classList.toggle("toggle");
      // Animate Links
      navLinks.forEach((link, index) => {
        if (!link.style.animation) {
          link.style.animation = `navLinkFade 0.5 ease forwards ${
            index / 3 + 1.5
          }s`;
        } else {
          link.style.animation = "";
        }
      });
    });
  }, []);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
    props.clearFavorites();
  };
  const userNavbar1 = props.auth.isAuthenticated ? (
    <li>
      <Link to="/profile">{props.auth.user.userName}</Link>
    </li>
  ) : (
    <li>
      <Link to="/login">Login</Link>
    </li>
  );
  const userNavbar2 = props.auth.isAuthenticated ? (
    <li>
      <Link onClick={handleLogoutClick} className="">
        Logout
      </Link>
    </li>
  ) : (
    <li>
      <Link to="/register">Sign Up</Link>
    </li>
  );
  return (
    <header className="App-header">
      <nav className="">
        <div className="logo">
          <FaUserAstronaut className="astro-icon" />
        </div>
        <ul className="nav-links">
          <li>
            <Link className="" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="" to="/cities">
              Travel
            </Link>
          </li>
          <li>
            <Link className="" to="/about">
              About the App
            </Link>
          </li>
          {userNavbar1}
          {userNavbar2}
        </ul>
        <div className="burger my-button">
          <div className="line1" />
          <div className="line2" />
          <div className="line3" />
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logoutUser, clearFavorites })(
  MyNavbar
);
