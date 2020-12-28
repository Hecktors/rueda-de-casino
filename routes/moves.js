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

// Add move
router.post("/add", auth, async (req, res) => {
  const userID = req.body.userID
  const levelName = req.body.levelName
  const moveName = req.body.moveName.toLowerCase().trim().replace(/\s+/g, " ")
  const bars = req.body.bars
  const audioName = moveName.replace(/\s/g, "_") + ".mp3"
  const videoUrl = req.body.videoUrl
  const videoStart = req.body.videoStart
  // 2. Find level, add if not exists
  // 3. Find move, add if not exists 
  const newMove = new Move({
    name: moveName,
    bars,
    audioName,
    videoUrl,
    videoStart
  })

  // Find pensum and add if not exists
  const pensum = await Pensum.findOne({userID: userID})
  .then(foundPensum => {
    if(!foundPensum) {
      const newPensum = new Pensum({userID: userID})
      return newPensum.save()
      .then(res => res)
      .catch(err => res.status(400).json({msg: "Error: " + err}))
    }
    return foundPensum
  })
  .catch((err) => res.status(400).json("Error: " + err))

  //  Find level and add if not exists
  let hasLevel = pensum.levels.find(level => level.name === levelName)
  if(!hasLevel) {
    const newLevel = new Level({name: levelName})
    pensum.levels.push(newLevel)
  }

  //  Find move and add if not exists
  const hasMove = pensum.levels.map(level => level.moves).flat().some(move => move.name === newMove.name)

  if(hasMove) {
    return res.status(400).json({msg: "Move allready exists."})
  }
  
  pensum.levels.forEach((level, index) => level.name === levelName && pensum.levels[index].moves.push(newMove))
  pensum.markModified('levels');
  pensum.save()
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
