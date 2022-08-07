import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/Post.css";
import "./styles/PostEdit.css";
import Base from "../Base/Base";

function PostEdit(props) {
  const [values, setValues] = useState({
    title: "",
    body: "",
    src: "",
    error: "",
    success: false,
  });

  const token = localStorage.getItem("jwt");
  const { id } = useParams();

  const getPost = () => {
    fetch(`http://localhost:8000/api/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const data = res.json();
        data.then((result) => {
          if (result.post) {
            const { title, body, src } = result.post;
            setValues({ title, body, src });
          } else {
            console.log("Not found");
          }
        });
      })
      .catch((err) => console.log(err));
  };

  const deletePost = () => {
    fetch(`http://localhost:8000/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        const data = res.json();
        data.then((result) => {
          if (result.post) {
            console.log("Post deleted");
            setValues({ ...values, success: true });
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          } else {
            setValues({ ...values, error: "Not Found" });
            console.log("Not found");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getPost();

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-5 text-center w-50 mx-auto"
        style={{ display: values.success ? "" : "none" }}
      >
        <h4>Successfully deleted the post!</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-5 text-center w-50 mx-auto"
        style={{ display: values.error ? "" : "none" }}
      >
        <h4>{values.error}</h4>
      </div>
    );
  };

  return (
    <Base>
      <div className="postedit-main">
        <h1>Edit Your Post</h1>
        {successMessage()}
        {errorMessage()}
        <div className="card postedit" style={{ width: "18rem" }}>
          <img className="card-img-top" src={values.src} />
          <div className=" postedit-body">
            <h5 className="card-title">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Title"
                defaultValue={values.title}
              />
            </h5>
            <p className="card-text">
              <textarea
                className="form-control"
                placeholder="Body"
                rows="3"
                defaultValue={values.body}
              />
            </p>
            <p className="card-text">
              <textarea
                className="form-control"
                placeholder="Src"
                rows="3"
                defaultValue={values.src}
              />
            </p>

            <hr />
            <div className="btn-ctrl">
              <button className="btn btn-primary">Save</button>
              <button className="btn btn-danger" onClick={deletePost}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default PostEdit;
