import React, { useState } from "react";
import Basic from "../Home/Basic";
import Post from "./Post";
import "./styles/Posts.css";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    const token = localStorage.getItem("jwt");

    fetch("http://localhost:8000/api/posts", {
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

  getPosts();

  const successPost = () => {
    return (
      <div className="container-fluid posts-main ">
        {posts.map((d) => (
          <div>
            <Link to={`/post/${d._id}`}>
              <Post key={d._id} src={d.src} title={d.title} body={d.body} />
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container-fluid posts-main ">
      {posts.length > 0 ? successPost() : <Basic />}
    </div>
  );
};

export default Posts;
