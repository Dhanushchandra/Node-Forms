const express = require("express");
const route = require("express").Router();
const { createUser, loginUser, mainPage } = require("../controllers/user");
const {
  userValidation,
  userValidationCheck,
} = require("../middlewares/user-validation");
const { verifyToken } = require("../middlewares/token-manager");

route.post("/sign_up", userValidation, userValidationCheck, createUser);

route.post("/sign_in", loginUser);

route.get("/", verifyToken, mainPage);

module.exports = route;
