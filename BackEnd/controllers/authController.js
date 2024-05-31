const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Quiz = require("../models/Quiz");

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
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.cookie("jwt", token, cookieOptions);
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
    // console.log(user);
    // console.log(req.body.password);
    // console.log(user.password);

    // if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    //   return next(new Error("Incorrect Email or Password"));
    // }

    if (!user || user.password !== req.body.password) {
      return next(new Error("Incorrect Email or Password"));
    }

    const token = signToken(`${user._id}`);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.cookie("jwt", token, cookieOptions);
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
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    // console.log(token);
    if (!token) {
      return next(new Error("Not logged In"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(decoded.id);
    // console.log(freshUser);

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

exports.signout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(204).json({
      status: "success",
      message: "logged out successfully",
    });
  } catch (err) {
    res.status(401).json({
      status: "failed",
      error: err,
    });
  }
};

exports.canChangeQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (quiz.createdBy === req.user._id) {
      next();
    } else {
      console.log("Not");
      return next(new Error("You cannot change the quiz"));
    }
    next();
  } catch (err) {
    res.status(401).json({
      status: "failed",
      error: err,
    });
  }
};
