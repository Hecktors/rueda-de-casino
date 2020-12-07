const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const levelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 1,
  },
});

const Level = new mongoose.model("Level", levelSchema);

module.exports = Level;
