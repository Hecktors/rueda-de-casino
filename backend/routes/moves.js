const router = require("express").Router();
let Move = require("../models/move.model");
const buildAudio = require("../services/buildAudio");

router.route("/").get((req, res) => {
  Move.find()
    .then((moves) => res.json(moves))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name.toLowerCase().trim().replace(/\s+/g, " ");
  const levelID = req.body.levelID;
  const steps = req.body.steps;
  const audioName = name.replace(/\s/g, "_") + ".mp3";
  const videoID = req.body.videoID;
  const videoStart = req.body.videoStart;

  buildAudio(name, audioName);

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
