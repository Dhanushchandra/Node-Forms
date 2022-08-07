import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../Base/Base";

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    success: false,
  });

  const { name, email, password, confirmPassword, error, success } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, error: "", success: false });

    fetch("http://localhost:8000/api/sign_up", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    })
      .then((response) => {
        response.json().then((data) => {
          if (data.errors) {
            setValues({ ...values, error: data.errors, success: false });
          } else {
            setValues({
              ...values,
              email: "",
              password: "",
              error: "",
              success: true,
            });

            document.getElementById("registerForm").reset();
            window.location.href = "/login";
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
        <h4>Registeration successful</h4>
        <p>
          Please <Link to="/login">login here!</Link>
        </p>
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
              <h2 className="text-center">Register</h2>
              <form id="registerForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    onChange={(e) => {
                      setValues({ ...values, name: e.target.value });
                    }}
                    type="text"
                    className="form-control"
                    placeholder="john doe"
                  />
                </div>

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
                <div className="form-group">
                  <label>Confirm password</label>
                  <input
                    onChange={(e) => {
                      setValues({ ...values, confirmPassword: e.target.value });
                    }}
                    type="password"
                    className="form-control"
                    placeholder="********"
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

export default Register;
