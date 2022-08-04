require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const { DBconnection } = require("./DB/index");
const path = require("path");

const userRoutes = require("./routes/user");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes

//users
app.use("/api", userRoutes);

//client - frontend

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/404.html"));
});

// Connect to MongoDB
DBconnection();
// Create a schema for our data

app.listen(port, () => console.log(`Listening on port ${port}`));
