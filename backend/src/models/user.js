const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [false, "Name is required!"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: 6,
    trim: true,
  },
  profilePicUrl: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
});
module.exports = mongoose.model("User", userSchema);
