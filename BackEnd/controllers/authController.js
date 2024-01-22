const jwt = require("jsonwebtoken");

const User = require("../models/User");

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
    });

    const token = signToken(newUser._id);

    return res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    return res.status(401).json({
      status: "failed",
      error: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new Error("Please provide email and password"));
    }
    const user = await User.findOne({ email: email });
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new Error("Incorrect Email or Password"));
    }
    const token = signToken(`${user._id}`);
    res.status(200).json({
      status: "success",
      token: token,
    });
  } catch (err) {
    res.status(401).json({
      status: "failed",
      error: err,
    });
  }
};

exports.userLoggedIn = async (req, res, next) => {
  try {
    // console.log(req.headers);
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // console.log(token);
    if (!token) {
      return next(new Error("Not logged In"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(decoded.id);
    console.log(freshUser);

    if (!freshUser) {
      return next(new Error("User doesn't exist"));
    }
    req.user = freshUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: "failed",
      error: err,
    });
  }
};
