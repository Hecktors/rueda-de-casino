const router = require("express").Router()
const User = require("../models/user.model")
const Move = require("../models/move.model")
const auth = require("../middleware/auth")
const checkExistenzOfMoveName = require("../services/checkExistenzOfMoveName")
const { deleteAudio, updateAudio, saveAudio } = require("../services/handleAudios")

// Add move
router.post("/add", auth, async (req, res) => {
  try {
    const userId = req.user
    const name = req.body.name.toLowerCase().trim().replace(/\s+/g, " ")
    const levelName = req.body.levelName
    const bars = req.body.bars
    const audioName = name.replace(/\s/g, "_") + ".mp3"
    const videoUrl = req.body.videoUrl
    const videoStart = req.body.videoStart

    if (!name || !levelName || !bars) {
      return res.status(400).json({ msg: "All required field have to been filled." })
    }

    if (name.length >= 30) {
      return res.status(400).json({ msg: "The move name is to long. Max num of character: 30." })
    }

    if (levelName.length >= 30) {
      return res.status(400).json({ msg: "The move name is to long. Max num of character: 30." })
    }

    if (bars >= 20) {
      return res.status(400).json({ msg: "The number of bars is to long. Max num: 20." })
    }

    if (await checkExistenzOfMoveName(userId, name)) {
      return res.status(400).json({ msg: `${name} allready exists.` })
    }

    const move = new Move({
      name,
      levelName,
      bars,
      audioName,
      videoUrl,
      videoStart,
    })

    return await move
      .save()
      .then((newMove) =>
        User.findById(userId)
          .then((user) => {
            user.moveIds = [...user.moveIds, newMove._id]
            user.save().then((user) => {
              saveAudio(user.id, move)
              res.json({ msg: newMove })
            })
          })
          .catch((err) => err)
      )
      .catch((err) => res.status(400).json({ msg: "error: ", err }))
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

// Get all moves
router.get("/", auth, (req, res) => {
  User.findById(req.user)
    .then((user) => {
      Move.find({ _id: { $in: user.moveIds } })
        .then((moves) => res.json({ msg: moves }))
        .catch((err) => res.status(400).json({ msg: err }))
    })
    .catch((err) => res.status(400).json({ msg: err }))
})

// Delete move
router.delete("/:moveId", auth, (req, res) => {
  Move.findByIdAndDelete(req.params.moveId)
    .then((move) => {
      User.findById(req.user)
        .then((user) => {
          user.moveIds = user.moveIds.filter((moveId) => moveId !== String(move._id))
          user.save().then(() => {
            deleteAudio(req.user, move.audioName)
            res.json({ msg: move })
          })
        })
        .catch((err) => res.status(400).json({ msg: err }))
    })
    .catch((err) => res.status(400).json({ msg: err }))
})

// Update move
router.post("/update/:id", auth, async (req, res) => {
  try {
    const name = req.body.name.toLowerCase().trim().replace(/\s+/g, " ")
    const levelName = req.body.levelName
    const bars = req.body.bars
    const audioName = name.replace(/\s/g, "_") + ".mp3"
    const videoUrl = req.body.videoUrl
    const videoStart = req.body.videoStart

    if (!name || !levelName || !bars) {
      return res.status(400).json({ msg: "All required field have to been filled." })
    }

    if (name.length >= 30) {
      return res.status(400).json({ msg: "The move name is to long. Max num of character: 30." })
    }

    if (levelName.length >= 30) {
      return res.status(400).json({ msg: "The move name is to long. Max num of character: 30." })
    }

    if (bars >= 20) {
      return res.status(400).json({ msg: "The number of bars is to long. Max num: 20." })
    }

    if (await checkExistenzOfMoveName(req.user, name, req.params.id)) {
      return res.status(400).json({ msg: "Move name allready exists." })
    }

    const updatedMove = await Move.findById(req.params.id)
      .then((res) => res)
      .catch((err) => res.status(400).json({ msg: err }))
    const prevName = updatedMove.name
    const prevAudioName = updatedMove.audioName
    updatedMove.name = name
    updatedMove.levelName = levelName
    updatedMove.bars = bars
    updatedMove.audioName = audioName
    updatedMove.videoUrl = videoUrl
    updatedMove.videoStart = videoStart

    updatedMove
      .save()
      .then((move) => {
        name !== prevName && updateAudio(req.user, prevAudioName, updatedMove)
        return res.json({ msg: move })
      })
      .catch((err) => res.status(400).json({ msg: err }))
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

module.exports = router
