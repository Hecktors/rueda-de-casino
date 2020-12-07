const router = require("express").Router();
const Move = require("../models/move.model");
const path = require("path");

// Get audioUrl
router.route("/:id").get((req, res) => {
  console.log(req.params.id);
  Move.findById(req.params.id)
    .then((move) => {
      res.sendFile(path.join(__dirname, "../public", move.audioName));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
