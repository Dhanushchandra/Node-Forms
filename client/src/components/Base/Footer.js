import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="row design-footer">
        <div className="col-12 text-center">
          <p>
            &copy; Designed and Developed by:
            <a
              href="https://github.com/Dhanushchandra"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {" "}
              <strong>Dhanush C</strong>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
