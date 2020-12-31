const router = require("express").Router()
const User = require('../models/user.model')
const Move = require("../models/move.model")
const auth = require("../middleware/auth")
const checkExistenzOfMoveName = require("../services/checkExistenzOfMoveName")

// Add move
router.post("/add", auth, async (req, res) => {
  try {
  const userID = req.user
  const name = req.body.name.toLowerCase().trim().replace(/\s+/g, " ")
  const levelName = req.body.levelName
  const bars = req.body.bars
  const audioName = name.replace(/\s/g, "_") + ".mp3"
  const videoUrl = req.body.videoUrl
  const videoStart = req.body.videoStart

  if(!name || !levelName || !bars) {
    return res.status(400).json({msg: "All required field have to been filled."})
  }

  if(name.length >= 30) {
    return res.status(400).json({msg: "The move name is to long. Max num of character: 30."})
  }

  if(levelName.length >= 30) {
    return res.status(400).json({msg: "The move name is to long. Max num of character: 30."})
  }

  if(bars >= 20) {
    return res.status(400).json({msg: "The number of bars is to long. Max num: 20."})
  }

  if(await checkExistenzOfMoveName(userID, name)){
    return res.status(400).json({msg: `${name} allready exists.`})
  }
  
  const move = new Move({
    name,
    levelName,
    bars,
    audioName,
    videoUrl,
    videoStart
  })

  return await move.save()
  .then(newMove =>  User.findById(userID)
    .then(user => {
      user.moveIDs = [...user.moveIDs, newMove._id]
      user.save()
      res.json({msg: newMove})
    })
    .catch(err => err)
  )
  .catch(err => res.status(400).json({msg: "error: ", err}))
} catch(err) {
  res.status(500).json({msg: err.message})
}

})

// Get all moves
router.get("/", auth, (req,res) => {
  User.findById(req.user)
  .then(user => {
    Move.find({_id: {$in: user.moveIDs}})
    .then(moves => res.json({msg: moves}))
    .catch(err => res.status(400).json({msg: err}))
  })
  .catch(err => res.status(400).json({msg: err}))
})

// Delete move
router.delete("/:id", auth, (req, res)=> {
  Move.findByIdAndDelete(req.params.id)
  .then(move => {
    User.findById(req.user)
    .then(user => {
      user.moveIDs = user.moveIDs.filter(moveID => moveID !== String(move._id))
      user.save()
      res.json({msg: move})
    })
    .catch(err => res.status(400).json({msg: err}))
  })
  .catch(err => res.status(400).json({msg: err}))
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
    
    if(!name || !levelName || !bars) {
      return res.status(400).json({msg: "All required field have to been filled."})
    }
    
    if(name.length >= 30) {
      return res.status(400).json({msg: "The move name is to long. Max num of character: 30."})
    }
    
    if(levelName.length >= 30) {
      return res.status(400).json({msg: "The move name is to long. Max num of character: 30."})
    }
  
    if(bars >= 20) {
      return res.status(400).json({msg: "The number of bars is to long. Max num: 20."})
    }
    
    if(await checkExistenzOfMoveName(req.user, name, req.params.id)){
      return res.status(400).json({msg: "Move name allready exists."})
    }
    
    const updatedMove = await Move.findById(req.params.id)
    .then(res => res)
    .catch(err => res.status(400).json({msg: err}))
    
    updatedMove.name = name
    updatedMove.levelName = levelName
    updatedMove.bars = bars
    updatedMove.audioName = audioName
    updatedMove.videoUrl = videoUrl
    updatedMove.videoStart = videoStart

    updatedMove.save()
    .then(move => res.json({msg: move}))
    .catch(err => res.status(400).json({msg: err}))
    
  } catch(err) {
    res.status(500).json({msg: err.message})
  }
})

module.exports = router
