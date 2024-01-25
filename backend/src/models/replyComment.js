const replyComment = {
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
    type: String,
  },
  profilePicUrl: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
};
