const mongoose = require("mongoose");
const validator = require("validator");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  messName: {
    type: String,
    enum: ["A", "B", "C"],
    required: [true, "Enter which Mess you work for"],
  },
  password: {
    type: String,
    required: [true, "Provide a password"],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
});

module.exports = Admin = mongoose.model("Admin", AdminSchema);
