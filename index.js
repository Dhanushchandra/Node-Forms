require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const { DBconnection } = require("./DB/index");
const path = require("path");

const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/posts");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes

//users
app.use("/api", userRoutes);
app.use("/api/posts", postsRoutes);

//client - frontend

// Connect to MongoDB
DBconnection();
// Create a schema for our data

app.listen(port, () => console.log(`Listening on port ${port}`));
