const User = require("../../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .populate({
        path: "products",
        populate: {
          path: "comments",
          populate: {
            path: "user",
            select: ["email", "profilePicUrl", "name"],
          },
        },
      })
      .select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllUsers };
