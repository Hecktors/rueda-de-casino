const mongoose = require("mongoose")

const Schema = mongoose.Schema

const moveSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  levelName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30
  },
  bars: {
    type: Number,
    required: true,
    max: 20,
  },
  audioName: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 50,
  },
  videoUrl: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  videoStart: {
    type: String,
    trim: true,
    maxlength: 10,
  },
})

const Move = mongoose.model("Move", moveSchema)

module.exports = Move
