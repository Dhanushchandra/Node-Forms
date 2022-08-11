import React from "react";
import "./styles/Post.css";

function Post(props) {
  return (
    <div className="card post-main" style={{ width: "18rem" }}>
      <img className="card-img-top" src={props.src} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.body}</p>
        <p className="card-creater">
          Posted by: <span> {props.name}</span>
        </p>
      </div>
    </div>
  );
}

export default Post;
