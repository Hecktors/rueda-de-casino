const router = require("express").Router();
let Move = require("../models/move.model");

router.route("/").get((req, res) => {
  Move.find()
    .then((moves) => res.json(moves))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const levelID = req.body.levelID;
  const steps = req.body.steps;
  const audioName = "test";
  const videoID = req.body.videoID;
  const videoStart = req.body.videoStart;

  const newMove = new Move({
    name,
    levelID,
    steps,
    audioName,
    videoID,
    videoStart,
  });

  newMove
    .save()
    .then(() => res.json("Move added successfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
