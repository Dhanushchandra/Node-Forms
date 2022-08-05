import React from "react";

function Logout() {
  return (
    <input
      className="btn btn-danger btn-block"
      type="submit"
      value={`Logout`}
      onClick={(e) => {
        e.preventDefault();
        localStorage.removeItem("jwt");
        window.location.href = "/";
      }}
    />
  );
}

export default Logout;
