import React, { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../Forms/Logout";
import "./styles/Navbar.css";
import { isAuthenticated } from "../../helpers/Authenticated";

function Navbar() {
  const [token, setToken] = React.useState(false);

  useLayoutEffect(() => {
    isAuthenticated()
      .then((res) => {
        if (res) {
          setToken(true);
        } else {
          setToken(false);
        }
      })
      .catch((err) => {
        setToken(false);
      });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          POST-APP
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end "
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav ">
            <a className="nav-link active " aria-current="page">
              <Link className="link" to="/">
                Home
              </Link>
            </a>
            <a className="nav-link  " aria-current="page">
              {token ? (
                <Link className="link" to="/myposts">
                  My Posts
                </Link>
              ) : null}
            </a>
            <a className="nav-link  " aria-current="page">
              {token ? (
                <Link className="link" to="/createpost">
                  Create
                </Link>
              ) : null}
            </a>
            <a className="nav-link">
              {token ? null : (
                <Link className="link" to="/register">
                  Register
                </Link>
              )}
            </a>
            <a className="nav-link">
              {token ? null : (
                <Link className="link" to="/login">
                  Login
                </Link>
              )}
            </a>
            {token ? <Logout /> : null}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
