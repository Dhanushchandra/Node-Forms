import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Posts/styles/Post.css";
import "./styles/PostEdit.css";
import Base from "../Base/Base";

function PostEdit(props) {
  const [values, setValues] = useState({
    title: "",
    body: "",
    src: "",
    error: "",
    success: false,
    successMsg: "",
  });

  const token = localStorage.getItem("jwt");
  const { postId } = useParams();
  const userId = localStorage.getItem("userId");

  const getPost = () => {
    fetch(`http://localhost:8000/api/posts/user/${userId}/${postId}`, {
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

  const updatePost = () => {
    fetch(`http://localhost:8000/api/posts/user/${userId}/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: values.title,
        body: values.body,
        src: values.src,
      }),
    })
      .then((res) => {
        const data = res.json();
        data.then((result) => {
          if (result.post) {
            setValues({ ...values, success: true, successMsg: "Post updated" });
          } else {
            console.log("Not found");
          }
        });
      })
      .catch((err) => console.log(err));
  };

  const deletePost = () => {
    fetch(`http://localhost:8000/api/posts/user/${userId}/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        const data = res.json();
        data.then((result) => {
          if (result.post) {
            setValues({ ...values, success: true, successMsg: "Post deleted" });
            setTimeout(() => {
              window.location.href = "/";
            }, 1500);
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

  useEffect(() => {
    getPost();
  }, []);

  setTimeout(() => {
    const successMsg = document.querySelector(".alert");
    successMsg.style.display = "none";
  }, 3000);

  const successMessage = (v) => {
    return (
      <div
        className="alert alert-success mt-5 text-center w-50 mx-auto"
        style={{ display: values.success ? "" : "none" }}
      >
        <h4>{v}</h4>
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
        {successMessage(values.successMsg)}
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
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
              />
            </h5>
            <p className="card-text">
              <textarea
                className="form-control"
                placeholder="Body"
                rows="3"
                defaultValue={values.body}
                onChange={(e) => setValues({ ...values, body: e.target.value })}
              />
            </p>
            <p className="card-text">
              <textarea
                className="form-control"
                placeholder="Src"
                rows="3"
                defaultValue={values.src}
                onChange={(e) => setValues({ ...values, src: e.target.value })}
              />
            </p>

            <hr />
            <div className="btn-ctrl">
              <button className="btn btn-primary" onClick={updatePost}>
                Save
              </button>
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
