const Quiz = require("../models/Quiz");

exports.createQuiz = async (req, res) => {
  try {
    // console.log(req.user._id);
    const newQuiz = await Quiz.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user._id,
    });
    // console.log(newQuiz);
    res.status(201).json({
      status: "success",
      data: {
        Quiz: newQuiz,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed2",
      message: err,
    });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const Quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        Quiz,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    // console.log(req.params);
    const Quiz = await Quiz.findById(req.params.id);
    return res.status(200).json({
      status: "success",
      data: {
        Quiz,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getAllQuizs = async (req, res, next) => {
  try {
    // console.log("Hello");
    const Quizs = await Quiz.find();
    return res.status(200).json({
      status: "success",
      result: Quizs.length,
      data: {
        Quizs,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
