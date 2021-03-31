const router = require("express").Router()
const path = require("path")
const auth = require("../middleware/auth")
const { saveAudio } = require("../services/handleAudios")
const { checkExistenzOfAudio } = require("../services/handleFiles")
const Move = require("../models/move.model")

router.get("/:id", auth, (req, res) => {
  Move.findById(req.params.id)
    .then(async (move) => {
      const target = path.join(__dirname, `../public/audio/${req.user}/${move.audioName}`)
      let result = await checkExistenzOfAudio(target)
      !result && (await saveAudio(req.user, move))
      res.sendFile(target)
    })
    .catch((err) => res.status(400).json("Error: " + err))
})

module.exports = router
