const Quiz = require("../models/Quiz");
const Submission = require("../models/Submission");
const User = require("../models/User");

exports.getAllSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find();
    return res.status(200).json({
      status: "success",
      result: submissions.length,
      data: {
        submissions,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.createSubmission = async (req, res, next) => {
  try {
    // console.log(req.params);
    const quiz = await Quiz.findById(req.params.quizId);
    const newSubmission = await Submission.create({
      submittedBy: req.user._id,
      quizID: req.params.quizId,
      quizName: quiz.name,
      score: req.body.score,
      inCorrectQuestions: req.body.inCorrectQuestions,
      correctQuestions: req.body.correctQuestions,
    });
    const user = await User.findById(req.user._id);
    if (!user.givenQuizes.includes(req.params.quizId)) {
      user.givenQuizes.push(req.params.quizId);
    }
    user.submissionMade.push(newSubmission._id);
    await user.save();

    // const quiz = await Quiz.findById(req.params.quizId);
    quiz.submissions.push(newSubmission._id);
    await quiz.save();
    res.status(201).json({
      status: "success",
      data: {
        submission: newSubmission,
        user: user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getMySubmissions = async (req, res, next) => {
  try {
    await req.user.populate({
      path: "submissionMade",
    });
    res.status(200).json({
      status: "success",
      data: req.user.submissionMade,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getSubmission = async (req, res, next) => {
  try {
    // console.log(req.params);
    // console.log(req.params.id);
    const submission = await Submission.findById(req.params.id)
      .populate("correctQuestions")
      .populate({
        path: "inCorrectQuestions",
        populate: {
          path: "questionID",
        },
      });
    // console.log(quiz);
    return res.status(200).json({
      status: "success",
      data: {
        submission,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
