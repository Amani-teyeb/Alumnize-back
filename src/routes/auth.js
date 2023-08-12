const express = require("express");
const {
  signup,
  signin,
  signout,
  getUsers,
  getTeachers,
  deleteUser,
  editUser,
  allUsers,
} = require("../controllers/auth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/auth");
const router = express();
const User = require("../models/user");
const { adminMiddleware, requireSignin } = require("../common-middleware");

router.post("/signin", validateSigninRequest, isRequestValidated, signin);

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signout", signout);
router.get("/getUsers", getUsers);
router.get("/getTeachers", getTeachers);
router.post("/user/deleteUser", requireSignin, adminMiddleware, deleteUser);
router.post("/user/editUser", requireSignin, adminMiddleware, editUser);
module.exports = router;
router.get("/getUserSearch", requireSignin, allUsers);
