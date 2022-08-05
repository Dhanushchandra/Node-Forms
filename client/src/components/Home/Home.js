import React from "react";
import Basic from "./Basic";
import Navbar from "./Navbar";
import Posts from "./Posts";

function Home() {
  return (
    <div>
      <Navbar />
      <Posts />
      <Basic />
    </div>
  );
}

export default Home;
