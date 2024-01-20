const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A name is required"],
    },
    email: {
      type: String,
      required: [true, "An email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Email is not valid"],
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "A password is required"],
      minLength: 8,
    },
    gender: { type: String, required: true },
    createdQuizes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Quiz",
      },
    ],
    givenQuizes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Quiz",
      },
    ],
    submissionMade: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Submission",
      },
    ],
    feedbackGiven: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Feedback",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    isAdmin: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
