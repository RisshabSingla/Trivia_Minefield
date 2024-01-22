const Question = require("../models/Question");
const Submission = require("../models/Submission");
const Quiz = require("../models/Quiz");

exports.createQuiz = async (req, res) => {
  try {
    const newQuiz = await Quiz.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user._id,
    });
    // console.log(newQuiz);
    const Question_ids = await Promise.all(
      req.body.questions.map((question) => {
        // console.log(question);
        return Question.create({
          question: question.question,
          choices: question.choices,
          correct: question.correct,
          type: question.type,
          score: question.score,
          quizId: newQuiz._id,
          createdBy: req.user._id,
        });
      })
    );

    // console.log(Question_ids);
    const ids = Question_ids.map((question) => question._id);
    // console.log(ids);
    newQuiz.questions = ids;
    await newQuiz.save();
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
    console.log(req.params.id);
    const quiz = await Quiz.findById(req.params.id)
      .populate({
        path: "questions",
      })
      .populate({
        path: "submissions",
      });
    console.log(quiz);
    return res.status(200).json({
      status: "success",
      data: {
        quiz,
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
    // console.log(req);
    const quizs = await Quiz.find();
    console.log(quizs);
    return res.status(200).json({
      status: "success",
      result: quizs.length,
      data: {
        quizs,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
