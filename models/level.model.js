const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const levelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
  },
});

const Level = mongoose.model("Level", levelSchema);

module.exports = Level;
