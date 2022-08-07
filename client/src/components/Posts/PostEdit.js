import React from "react";
import { useParams } from "react-router-dom";
import "./styles/Post.css";
import "./styles/PostEdit.css";

function PostEdit(props) {
  const { id } = useParams();

  return (
    <div className="card postedit-main" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">
          <input type="text" className="form-control" placeholder="Title" />
        </h5>
        <p className="card-text">
          <input type="text" className="form-control" placeholder="Body" />
        </p>
      </div>
      <hr />
      <div className="btn-ctrl">
        <button className="btn btn-primary">Save</button>
        <button className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}

export default PostEdit;
