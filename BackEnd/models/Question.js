const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: [true, "A question is required"] },
  choices: {
    type: [String],
    required: [true, "Some choices are required for the question"],
  },
  correct: {
    type: [String],
    required: [true, "Atleast one options would be correct"],
  },
  type: {
    type: String,
    required: [true, "A quiz can be single choiced, multiple choiced"],
    default: "single",
  },
  score: {
    type: Number,
    required: [true, "A question must have a score"],
  },
  explanation: { type: String },
  createdAt: { type: Date, default: Date.now() },
  quizId: {
    type: mongoose.Schema.ObjectId,
    ref: "Quiz",
    required: [true, "A question must belong to some quiz"],
    index: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A question must be created by someone"],
  },
});

questionSchema.methods.correctAns = async function (userAnswer) {
  if (userAnswer.length !== this.correct.length) {
    return false;
  }
  return userAnswer.sort() === this.correct;
};

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
