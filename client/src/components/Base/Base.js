import React from "react";
import Navbar from "../Home/Navbar";
import "./styles/Base.css";

function Base({ children }) {
  return (
    <div className="base">
      <Navbar />
      {children}
    </div>
  );
}

export default Base;
