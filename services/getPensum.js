const Pensum = require("../models/pensum.model")

async function getPensum(userID) {
  return await Pensum.findOne({userID: userID})
    .then((pensum) => pensum)
    .catch((err) => {return {msg: err}})
}

module.exports = getPensum
