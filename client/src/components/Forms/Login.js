import React from "react";
import { useState } from "react";
import Base from "../Base/Base";
import "./styles/Login.css";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { email, password, error, success } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, error: "", success: false });

    fetch("http://localhost:8000/api/sign_in", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        response.json().then((data) => {
          if (data.error) {
            console.log(data.error);
            setValues({ ...values, error: data.error, success: false });
          } else {
            setValues({
              ...values,
              email: "",
              password: "",
              error: "",
              success: true,
            });
            console.log("login success");
            localStorage.setItem("jwt", data.token);
            document.getElementById("loginForm").reset();
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
        <h4>You have successfully logged in..</h4>
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
      <div className="container login">
        {successMessage()}
        {errorMessage()}
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
              <h2 className="text-center">Login</h2>
              <form id="loginForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    onChange={(e) => {
                      setValues({ ...values, email: e.target.value });
                    }}
                    type="email"
                    className="form-control"
                    placeholder="example@example.com"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    onChange={(e) => {
                      setValues({ ...values, password: e.target.value });
                    }}
                    type="password"
                    className="form-control"
                    placeholder="********"
                  />
                </div>
                <div className="form-group mt-4">
                  <input
                    type="submit"
                    value="Login"
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

export default Login;
