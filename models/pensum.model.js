const mongoose = require("mongoose")

const Schema = mongoose.Schema

const pensumSchema = new Schema({
  userID: {
        type: String,
        required: true,
        unique: true,
  },
  levels: []
})

const Pensum = mongoose.model("Pensum", pensumSchema)

module.exports = Pensum
