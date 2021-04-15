const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 8,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  displayName: {
    type: String,
  },
  moveIDs: [
    {
      type: String,
    },
  ],
  resetLink: {
    data: String,
    default: "",
  },
})

const User = mongoose.model("User", userSchema)
module.exports = User
