import React from "react";
import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import CreatePosts from "./components/Forms/CreatePosts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";

//main
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePosts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
