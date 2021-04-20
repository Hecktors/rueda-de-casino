const Move = require("../models/move.model")
const User = require("../models/user.model")

async function checkExistenzOfMoveName(userID, moveName, moveId) {
  const foundUser = await User.findById(userID)
  return await Move.findOne({ name: moveName, _id: { $in: foundUser.moveIds } })
    .then((move) => {
      if (move && moveId && String(move._id) === moveId) {
        return false
      }
      return !!move
    })
    .catch((err) => console.log("Error checkNameUniqueness: ", err))
}
module.exports = checkExistenzOfMoveName
