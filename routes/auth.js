const express = require("express");
const passport = require('passport');
const {
  createUser,
  fetchUserById,
  saveUserAddress,
  checkAuth,
  logout
} = require("../controllers/auth");
const authRouter = express.Router();

authRouter
  .post("/sign-up",createUser)
  .post("/login",passport.authenticate('local'),fetchUserById)
  .get('/check',passport.authenticate('jwt'), checkAuth)
  .patch("/:id", saveUserAddress).get('/logout', logout);

module.exports = { authRouter };
