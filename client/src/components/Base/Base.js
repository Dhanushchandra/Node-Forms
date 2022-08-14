import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./styles/Base.css";
import "./styles/Footer.css";

function Base({ children }) {
  return (
    <div className="base">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Base;
