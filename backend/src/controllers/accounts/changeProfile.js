const User = require("../../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../../models/product");

const CreateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const changeProfile = async (req, res) => {
  const {
    email,
    password,
    newEmail,
    newPassword,
    name,
    profilePicUrl,
    phoneNumber,
    address,
  } = req.body;

  if (!email || !password || !newEmail || !newPassword) {
    res.status(400).json({
      message: " Email, password and new password, new email are required",
    });
  }

  //   res.json({ email, password, newEmail, newPassword });

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentails" });
      return;
    }

    if (!validator.isEmail(newEmail)) {
      res.status(400).send("Please provide a valid email");
      return;
    }

    if (!validator.isStrongPassword(newPassword)) {
      res
        .status(400)
        .send(
          "Please provide at least one, lowercase one uppercase, one number, one symbol,  a strong password"
        );
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.email = newEmail;
    user.password = hashedNewPassword;
    user.name = name;
    user.profilePicUrl = profilePicUrl;
    user.phoneNumber = phoneNumber;
    user.address = address;

    const updatedUser = await user.save();

    const token = CreateToken(updatedUser._id);

    res.status(200).json({
      message: "Update successfully",
      user: {
        email: updatedUser.email,
        name: updatedUser.name,
        id: updatedUser._id,
        profilePicUrl: updatedUser.profilePicUrl,
        phoneNumber: updatedUser.phoneNumber,
        address: updatedUser.address,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { changeProfile };
