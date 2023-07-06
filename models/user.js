const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    jobTitle: {
      type: "string",
    },
    gender: {
      type: "string",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;