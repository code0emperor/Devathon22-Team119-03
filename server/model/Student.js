const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
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
  rollNo: {
    type: String,
    required: [true, "Provide your roll number"],
    unique: true,
  },
  hasEaten: {
    type: Boolean,
    default: false,
  },
  creditA: {
    type: Number,
    default: 0,
  },
  creditB: {
    type: Number,
    default: 0,
  },
  creditC: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: [true, "Provide a password"],
    minlength: 6,
    select: false,
  },
});
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
