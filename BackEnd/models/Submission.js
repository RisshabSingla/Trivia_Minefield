const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  submittedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A Submission must be made by some user"],
    index: true,
  },
  quizName: {
    type: String,
    required: [true, "A Submission must belong to some quiz"],
  },
  quizID: {
    type: mongoose.Schema.ObjectId,
    ref: "Quiz",
    required: [true, "A Submission must belong to some quiz"],
    index: true,
  },
  correctQuestions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
    },
  ],
  inCorrectQuestions: [
    {
      questionID: {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
      },
      choiceAnswered: {
        type: String,
        required: [true, "The user must have chosen some option"],
      },
    },
  ],
  score: {
    type: Number,
    required: [true, "A submission must have a total score"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
