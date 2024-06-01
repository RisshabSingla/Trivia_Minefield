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
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  questions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
    },
  ],
});

// quizSchema.pre("findById", function (next) {
//   console.log("Inside");
//   this.populate({
//     path: "questions",
//   });
//   // this.populate({
//   //   path: "submissions",
//   // }).populate({
//   //   path: "questions",
//   // });
//   next();
// });

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
