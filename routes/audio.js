const router = require("express").Router();
const Move = require("../models/move.model");
const path = require("path");

router.route("/:id").get((req, res) => {
  Move.findById(req.params.id)
    .then((move) => {
      res.sendFile(path.join(__dirname, "../public/audio", move.audioName));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
