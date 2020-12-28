const router = require("express").Router()
const User = require('../models/user.model')
const Pensum = require('../models/pensum.model')
const Move = require("../models/move.model")
const auth = require("../middleware/auth")
const getPensum = require("../services/getPensum")
const addAudio = require("../services/addAudio")
const deleteAudio = require("../services/deleteAudio")
const addLevelIfNotExist = require("../services/addLevelIfNotExist")
const deleteLevelIfEmpty = require("../services/deleteLevelIfEmpty")
const { json } = require("express")
const Level = require("../models/level.model")
const checkMoveExistence = require("../services/checkMoveExistence")
const addMoveToPensum = require("../services/addMoveToPesum")

// Add move
router.post("/add", auth, async (req, res) => {
  const userID = req.body.userID
  const levelName = req.body.levelName
  const moveName = req.body.moveName.toLowerCase().trim().replace(/\s+/g, " ")
  const bars = req.body.bars
  const audioName = moveName.replace(/\s/g, "_") + ".mp3"
  const videoUrl = req.body.videoUrl
  const videoStart = req.body.videoStart

  const newMove = new Move({
    name: moveName,
    bars,
    audioName,
    videoUrl,
    videoStart
  })

  const pensum = await getPensum(userID)

  addLevelIfNotExist(pensum, levelName)
  checkMoveExistence(pensum, newMove.name)
  if(checkMoveExistence(pensum, newMove.name)) {return res.status(400).json({msg: "Move allready exists."})}

  const updatedPensum = addMoveToPensum(pensum, levelName, newMove)
  updatedPensum.save()
  .then(() => {
    addAudio(newMove.name, audioName)
    res.json(pensum)
  })
  .catch(err => res.status(400).json("Error: " + err))
})




  // newMove
  //   .save()
  //   .then(async () => {
  //     addAudio(name, audioName)
  //     addLevelIfNotExist(levelName)
  //     const response = await getPensum()
  //     response.err
  //       ? res.status(400).json("Error" + response.err)
  //       : res.json(response.pensum)
  //   })
  //   .catch((err) => res.status(400).json("Error: " + err))


// Add move
// router.route("/add").post((req, res) => {
//   const name = req.body.name.toLowerCase().trim().replace(/\s+/g, " ")
//   const levelName = req.body.levelName
//   const bars = req.body.bars
//   const audioName = name.replace(/\s/g, "_") + ".mp3"
//   const videoUrl = req.body.videoUrl
//   const videoStart = req.body.videoStart

//   const newMove = new Move({
//     name,
//     levelName,
//     bars,
//     audioName,
//     videoUrl,
//     videoStart,
//   })

//   newMove
//     .save()
//     .then(async () => {
//       addAudio(name, audioName)
//       addLevelIfNotExist(levelName)
//       const response = await getPensum()
//       response.err
//         ? res.status(400).json("Error" + response.err)
//         : res.json(response.pensum)
//     })
//     .catch((err) => res.status(400).json("Error: " + err))
// })


// Get pensum
router.get(("/"), auth, async (req, res) => {
  const response = await getPensum(req.user)
  response.err
    ? res.status(400).json("Error" + response.err)
    : res.json(response.levels)
})


// Get move
router.route("/:id").get((req, res) => {
  Move.findById(req.params.id)
    .then((move) => res.json(move))
    .catch((err) => res.status(400).json("Error: " + err))
})

// Delete move
router.route("/:id").delete((req, res) => {
  Move.findByIdAndDelete(req.params.id)
    .then(async (move) => {
      deleteAudio(move.audioName)
      deleteLevelIfEmpty(move.levelName)
      const response = await getPensum()
      response.err
        ? res.status(400).json("Error" + response.err)
        : res.json(response.pensum)
    })
    .catch((err) => res.status(400).json("Error: " + err))
})

// Update move
router.route("/update/:id").post((req, res) => {
  Move.findById(req.params.id)
    .then((move) => {
      const prevAudioName = move.audioName
      move.name = req.body.name.toLowerCase().trim().replace(/\s+/g, " ")
      move.levelName = req.body.levelName
      move.bars = req.body.bars
      move.audioName = req.body.name.replace(/\s/g, "_") + ".mp3"
      move.videoUrl = req.body.videoUrl
      move.videoStart = req.body.videoStart

      move
        .save()
        .then(async () => {
          if (prevAudioName !== move.audioName) {
            deleteAudio(prevAudioName)
            addLevelIfNotExist(move.levelName)
            deleteLevelIfEmpty(move.levelName)
            addAudio(move.name, move.audioName)
          }
          const response = await getPensum()
          setTimeout(() => {
            response.err
              ? res.status(400).json("Error" + response.err)
              : res.json(response.pensum)
          }, 500)
        })
        .catch((err) => res.status(400).json("Error: " + err))
    })
    .catch((err) => res.status(400).json("Error: " + err))
})

module.exports = router
