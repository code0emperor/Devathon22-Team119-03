const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Loading validator for login
const validateInput = require("../validation/login");

// Student model
const Student = require("../model/Student");

// Admin model
const Admin = require("../model/Admin");

// New Student Registration;
router.post("/register", (req, res) => {
  Student.findOne({ email: req.body.email }).then((student) => {
    if (student) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newStudent = new Student({
        name: req.body.name,
        email: req.body.email,
        rollNo: req.body.rollNo,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newStudent.password, salt, (err, hash) => {
          if (err) throw err;
          newStudent.password = hash;
          newStudent
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Student Login
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  Student.findOne({ email }, "password").then((student) => {
    // Check if user exists
    if (!student) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, student.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: student.id,
          name: student.name,
        };
        // Sign token
        jwt.sign(
          payload,
          process.env.SECRET,
          {
            expiresIn: 7200, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
