const Pensum = require("../models/pensum.model")

async function getPensum(userID) {
  return await Pensum.findOne({userID: userID})
  .then(foundPensum => {
    if(!foundPensum) {
      const newPensum = new Pensum({userID: userID})
      return newPensum.save()
      .then(res => res)
      .catch(err => console.log( "Error: " + err))
    }
    return foundPensum
  })
  .catch(err => console.log( "Error: " + err))
}

module.exports = getPensum
