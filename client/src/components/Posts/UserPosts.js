import React, { useState, useEffect } from "react";
import Basic from "../Home/Basic";
import Base from "../Base/Base";
import Post from "./Post";
import { Link } from "react-router-dom";

function UserPosts() {
  const token = localStorage.getItem("jwt");
  const userId = localStorage.getItem("userId");
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    fetch(`http://localhost:8000/api/posts/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.json();

        data
          .then((data) => {
            setPosts(data.posts);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

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

  const NoPost = () => {
    return (
      <div className="container-fluid posts-main ">
        <h1>No Post has been Uploaded!</h1>
      </div>
    );
  };

  return (
    <Base>
      <div className="container-fluid posts-main ">
        <h1>User Posts</h1>
        {posts.length > 0 ? successPost() : <NoPost />}
      </div>
    </Base>
  );
}

export default UserPosts;
