const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: " email doit être unique",
      });

    const {
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      advance,
      role,
      level,
      moy,
      payMeth,
      parentName,
    } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      parentName,
      moy,
      advance,
      contactNumber,
      hash_password,
      userName: shortid.generate(),
      role,
      level,
      payMeth,
    });

    _user.save((error, user) => {
      if (error) {
        console.log(error);
        return res.status(400).json({
          message: "something went wrong",
        });
      }
      if (user) {
        const {
          _id,
          firstName,
          lastName,
          parentName,
          contactNumber,
          email,
          advance,
          role,
          moy,
          fullName,
          level,
          payMeth,
        } = user;
        return res.status(201).json({
          user: {
            _id,
            firstName,
            lastName,
            parentName,
            contactNumber,
            advance,
            email,
            role,
            moy,
            fullName,
            level,
            payMeth,
          },
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if ((isPassword && user.role === "student") || user.role === "teacher") {
        // const token = jwt.sign(
        //   { _id: user._id, role: user.role },
        //   process.env.JWT_SECRET,
        //   { expiresIn: "1d" }
        // );
        const token = generateJwtToken(user._id, user.role);
        const {
          _id,
          firstName,
          lastName,
          email,
          role,
          fullName,
          advance,
          level,
          amount,
          moy,
        } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            advance,
            fullName,
            level,
            amount,
            moy,
          },
        });
      } else {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully ...!",
  });
};
exports.getUsers = (req, res) => {
  User.find({ role: "student" }).exec((error, users) => {
    if (error) return res.status(400).json({ error });
    if (users) return res.status(200).json({ users });
  });
};
exports.getTeachers = (req, res) => {
  User.find({ role: "teacher" }).exec((error, teachers) => {
    if (error) return res.status(400).json({ error });
    if (teachers) return res.status(200).json({ teachers });
  });
};

exports.editUser = async (req, res) => {
  const { _id, firstName, lastName, level, payMeth } = req.body;
  const user = { firstName, lastName, level, payMeth };
  const updatedUser = await User.findOneAndUpdate(_id, user, { new: true });
  if (updatedUser) {
    res.status(201).json({ message: "User Updated", updatedUser });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

exports.allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { firstName: { $regex: req.query.search, $options: "i" } },
          { lastName: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.status(200).json({ users });
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.body;

  const deleteUser = await User.findOneAndDelete({ _id: userId });
  if (deleteUser) {
    res.status(201).json({ message: "User removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
