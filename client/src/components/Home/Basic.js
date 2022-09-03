import React from "react";
import { Link } from "react-router-dom";
import "./styles/Basic.css";

function Basic() {
  return (
    <div className=" container-fluid basic-main">
      <img src="https://source.unsplash.com/random/300X300" alt="Loading..." />

      <div className="basic-text">
        <h1>Welcome to the Basic Page!</h1>
        <p>
          Please
          <Link style={{ textDecoration: "none" }} to="/login">
            {" "}
            login{" "}
          </Link>{" "}
          or
          <Link style={{ textDecoration: "none" }} to="/register">
            {" "}
            Register{" "}
          </Link>
          to see the posts.
        </p>
      </div>
    </div>
  );
}

export default Basic;
