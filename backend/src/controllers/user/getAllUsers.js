const User = require("../../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (!products) {
      res.status(404).json({ message: "Users not found" });
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllUsers };
