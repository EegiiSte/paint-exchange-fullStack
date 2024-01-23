const mongoose = require("mongoose");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CreateToken } = require("../../utils/utils");

const signInUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("signInUser", req.body);

  // Check if the email and password are provided
  if (!email || !password) {
    res.status(400).send("Please provide email and password");
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).send("User does not exist! Check your email address.");
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400).send("Invalid credentials");
    return;
  }
  const token = CreateToken(user._id);

  res.status(200).json({
    message: "Sign in successfully",
    user: {
      email: user.email,
      name: user.name,
      profilePicUrl: user.profilePicUrl,
      phoneNumber: user.phoneNumber,
      address: user.address,
      userId: user._id,
    },
    token,
  });
};

module.exports = { signInUser };
