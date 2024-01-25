const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const CreateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const signUpUser = async (req, res) => {
  //Destructure email and password from req.body
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res.status(400).send("Please provide email and password, name");
    return;
  }
  if (!validator.isEmail(email)) {
    res.status(400).send("Please provide a valid email");
    return;
  }

  if (!validator.isStrongPassword(password)) {
    res
      .status(400)
      .send(
        "Please provide at least one, lowercase one uppercase, one number, one symbol,  a strong password"
      );
    return;
  }

  try {
    // check if the user is already exists
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).send("User already exists");
      return;
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = CreateToken(newUser._id);

    res.status(200).json({ newUser, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = { signUpUser };
