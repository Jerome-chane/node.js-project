const { User, validate } = require("../models/users");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const _ = require("lodash"); // nice library to work with objects

router.get("/me", auth, async (req, res) => {
  const user = await await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10); // generates a long random string for extra protection
  user.password = await bcrypt.hash(user.password, salt); // encrypt user pawword

  await user.save();

  const token = user.generateAuthToken(); // call the method in the user model to generate the token

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));

  //   res.send({
  //     name: user.name,
  //     email: user.email,
  //   });
});

module.exports = router;
