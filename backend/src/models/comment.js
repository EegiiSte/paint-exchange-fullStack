const replyComment = require("./replyComment");
const comment = {
  name: {
    type: String,
    // required: [false, "Name is required!"],
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  comment: {
    type: [{ replyComment }],
  },
  profilePicUrl: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
};
