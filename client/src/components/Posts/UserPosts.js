import React, { useState, useEffect } from "react";
import Basic from "../Home/Basic";
import Base from "../Base/Base";
import Post from "./Post";
import { Link } from "react-router-dom";
import { API } from "../../config";

function UserPosts() {
  const token = localStorage.getItem("jwt");
  const userId = localStorage.getItem("userId");
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    fetch(`${API}/api/posts/user/${userId}`, {
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
          <div className="UserCards">
            <Link style={{ textDecoration: "none" }} to={`/post/${d._id}`}>
              <Post
                key={d._id}
                name={"own"}
                src={d.src}
                title={d.title}
                body={d.body}
              />
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
        <div style={{ textAlign: "center" }}>
          <h1>User Card</h1>
          <p>Click on the card to edit your post!! </p>
        </div>
        {posts.length > 0 ? successPost() : <NoPost />}
      </div>
    </Base>
  );
}

export default UserPosts;
