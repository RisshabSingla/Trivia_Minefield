const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name of the quiz is required"] },
  description: {
    type: String,
    required: [true, "A description for the quiz is required"],
  },
  submissions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Submission",
    },
  ],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A Quiz must be created by some user"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

quizSchema.pre(/^find/, function (next) {
  this.populate({
    path: "submissions",
  });
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
