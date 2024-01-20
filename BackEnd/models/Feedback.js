const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  submittedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A feedback must be made by some user"],
  },
  quizID: {
    type: mongoose.Schema.ObjectId,
    ref: "Quiz",
    required: [true, "A feedback must belong to some quiz"],
  },
  feedback: {
    type: String,
    required: [true, "A feedback must have a some text"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
