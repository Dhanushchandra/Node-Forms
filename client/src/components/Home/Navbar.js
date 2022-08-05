import React from "react";
import { Link } from "react-router-dom";
import Logout from "../Forms/Logout";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end "
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav ">
            <a className="nav-link active " aria-current="page">
              Home
            </a>
            <a className="nav-link">
              {localStorage.getItem("jwt") ? null : (
                <Link to="/register">Register</Link>
              )}
            </a>
            <a className="nav-link">
              {localStorage.getItem("jwt") ? null : (
                <Link to="/login">Login</Link>
              )}
            </a>
            {localStorage.getItem("jwt") ? <Logout /> : null}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
