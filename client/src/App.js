import React from "react";
import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import CreatePosts from "./components/Forms/CreatePosts";
import Base from "./components/Base/Base";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import { isAuthenticated } from "../src/helpers/Authenticated";

//main
function App() {
  isAuthenticated();
  const token = localStorage.getItem("jwt");

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {token ? (
            <Route path="/createpost" element={<CreatePosts />} />
          ) : (
            <Route path="/createpost" element={<Navigate to="/login" />} />
          )}
          <Route path="/base" element={<Base />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
