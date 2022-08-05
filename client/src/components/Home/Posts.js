import React from "react";
import Post from "./Post";
import "./styles/Posts.css";
import Data from "./sampledata";

function Posts() {
  return (
    <div className="container-fluid posts-main ">
      {Data.map((d) => (
        <Post key={d.id} src={d.src} title={d.title} body={d.body} />
      ))}
    </div>
  );
}

export default Posts;
