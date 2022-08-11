import React from "react";
import { useState } from "react";
import Base from "../Base/Base";

function CreatePosts() {
  const token = localStorage.getItem("jwt");
  const userId = localStorage.getItem("userId");

  const [values, setValues] = useState({
    title: "",
    body: "",
    src: "",
    error: "",
    success: false,
  });

  const { title, body, src, error, success } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, error: "", success: false });

    fetch(`http://localhost:8000/api/posts/user/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        body,
        src,
      }),
    })
      .then((response) => {
        response.json().then((data) => {
          const authError = data.error;

          const errorMsg = authError ? authError : data.errors;

          if (data.errors || data.error) {
            setValues({ ...values, error: errorMsg, success: false });
          } else {
            setValues({
              ...values,
              title: "",
              body: "",
              src: "",
              error: "",
              success: true,
            });
            document.getElementById("createPostForm").reset();
            window.location.href = "/";
          }
        });
      })
      .catch((error) => console.log("error in sign in", error));
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-5 text-center w-50 mx-auto"
        style={{ display: success ? "" : "none" }}
      >
        <h4>You have successfully Posted an article!</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-5 text-center w-50 mx-auto"
        style={{ display: error ? "" : "none" }}
      >
        <h4>{error}</h4>
      </div>
    );
  };

  return (
    <Base>
      <div className="container">
        {successMessage()}
        {errorMessage()}
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
              <h2 className="text-center">Create Post</h2>
              <form id="createPostForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    onChange={(e) => {
                      setValues({ ...values, title: e.target.value });
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Lengend of the Sword"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    onChange={(e) => {
                      setValues({ ...values, body: e.target.value });
                    }}
                    type="text"
                    className="form-control"
                    placeholder="The rise of superhero from the ashes of the past"
                  />
                </div>
                <div className="form-group">
                  <label>Image src</label>
                  <input
                    onChange={(e) => {
                      setValues({ ...values, src: e.target.value });
                    }}
                    type="text"
                    className="form-control"
                    placeholder="https://cat-images.com/image.jpg"
                  />
                </div>
                <div className="form-group mt-4">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default CreatePosts;
