const Question = require("../models/Question");

exports.createQuestion = async (req, res) => {
  try {
    const newQuestion = await Question.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        Question: newQuestion,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const Question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        Question,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
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

exports.getQuestion = async (req, res) => {
  try {
    // console.log(req.params);
    const Question = await Question.findById(req.params.id);
    return res.status(200).json({
      status: "success",
      data: {
        Question,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getAllQuestions = async (req, res, next) => {
  try {
    const Questions = await Question.find();
    return res.status(200).json({
      status: "success",
      result: Questions.length,
      data: {
        Questions,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
