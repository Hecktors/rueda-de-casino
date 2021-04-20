const User = require("../models/user.model")
const Move = require("../models/move.model")
const { saveAudio } = require("./handleAudios")

const defaultMoves = require("../assets/data/defaultMoves")

async function createDefaultMoves(userID) {
  const newMoveIds = await Promise.all(
    defaultMoves.map(async (move) => {
      return createNewMoves(move, userID)
    })
  )
  const id = await updateUser(userID, newMoveIds)
}

function createNewMoves(move, userID) {
  const newMove = new Move({
    name: move.name,
    levelName: move.levelName,
    bars: move.bars,
    audioName: move.audioName,
    videoUrl: move.videoUrl,
    videoStart: move.videoStart,
  })

  return newMove
    .save()
    .then((savedMove) => {
      saveAudio(userID, savedMove)
      return savedMove._id
    })
    .catch((err) => console.log(err))
}

function updateUser(userID, newMoveIds) {
  return User.findById(userID)
    .then(async (user) => {
      user.moveIds = newMoveIds
      user.save().catch((err) => console.log(err))
      return user._id
    })
    .catch((err) => console.log(err))
}

module.exports = createDefaultMoves
