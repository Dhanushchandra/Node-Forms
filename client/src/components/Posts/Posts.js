import React, { useState, useEffect } from "react";
import Basic from "../Home/Basic";
import Post from "./Post";
import "./styles/Posts.css";
import { Link } from "react-router-dom";
import { API } from "../../config";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("jwt");

  const getPosts = () => {
    fetch(`${API}/api/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.json();

        data.then((data) => {
          if (data.error) {
            return <Basic />;
          }

          setPosts(data.posts);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const Loading = () => {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };

  const successPost = () => {
    return (
      <div className="container-fluid posts-main ">
        {posts.map((d) => (
          <div>
            <Post
              key={d._id}
              name={d.user.name}
              src={d.src}
              title={d.title}
              body={d.body}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container-fluid posts-main ">
      {/* {posts.length > 0 ? successPost() : <Basic />} */}
      {token ? posts.length > 0 ? successPost() : <Loading /> : <Basic />}
    </div>
  );
};

export default Posts;
