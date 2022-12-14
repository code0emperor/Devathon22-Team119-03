const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

options.secretOrKey = process.env.SECRET;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const student = await Student.findById(jwt_payload.id);
        if (student) return done(null, student);
        else return done(null, false);
      } catch (err) {
        console.log(err);
      }
    })
  );
};
