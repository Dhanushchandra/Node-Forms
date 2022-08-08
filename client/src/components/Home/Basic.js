import React from "react";
import "./styles/Basic.css";

function Basic() {
  return (
    <div className=" container-fluid basic-main">
      <img src="https://source.unsplash.com/random/300X300" alt="Loading..." />

      <div className="basic-text">
        <h1>Welcome to the Basic Page!</h1>
        <p>Please login to see ours posts.</p>
      </div>
    </div>
  );
}

export default Basic;
