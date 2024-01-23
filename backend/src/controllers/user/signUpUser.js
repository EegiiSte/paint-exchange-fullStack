const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { CreateToken } = require("../../utils/utils");

const signUpUser = async (req, res) => {
  //Destructure email and password from req.body
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res.status(400).send("Please provide email and password, name");
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

    // Salt and hashing the password
    // password ---> 12345678
    // password + salt ---> 1234567asdfgh
    // hashing ---> asdgsgf1264614716

    // yarn add bcrypt
    // yarn add validator
    // Salt is random string that is added to the password
    const salt = await bcrypt.genSalt(10);

    // Hshing algoritm uses SHA-256 by default
    // console.log(salt);
    // $2b$10$l1C/5troDoVlPIyVzMgwxO
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = CreateToken(newUser._id);

    // bryprt.compare() sign hiihdee hergelne

    res.status(200).json({ newUser, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = { signUpUser };
