const router = require("express").Router();
const Move = require("../models/move.model");
const getPensum = require("../services/getPensum");
const addAudio = require("../services/addAudio");
const deleteAudio = require("../services/deleteAudio");
const addLevelIfNotExist = require("../services/addLevelIfNotExist");
const deleteLevelIfEmpty = require("../services/deleteLevelIfEmpty");

// Get all moves
router.route("/").get(async (req, res) => {
  const response = await getPensum();
  response.err
    ? res.status(400).json("Error" + response.err)
    : res.json(response.pensum);
});

// Add move
router.route("/add").post(async (req, res) => {
  const name = req.body.name.toLowerCase().trim().replace(/\s+/g, " ");
  const levelName = req.body.levelName;
  const steps = req.body.steps;
  const audioName = name.replace(/\s/g, "_") + ".mp3";
  const videoID = req.body.videoID;
  const videoStart = req.body.videoStart;

  const newMove = new Move({
    name,
    levelName,
    steps,
    audioName,
    videoID,
    videoStart,
  });

  newMove
    .save()
    .then(() => {
      addAudio(name, audioName);
      addLevelIfNotExist(levelName);
      res.json("Move added successfully!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get move
router.route("/:id").get((req, res) => {
  Move.findById(req.params.id)
    .then((move) => res.json(move))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete move
router.route("/:id").delete((req, res) => {
  Move.findByIdAndDelete(req.params.id)
    .then((move) => {
      deleteAudio(move.audioName);
      deleteLevelIfEmpty(move.levelName);
      res.json("Move deleted.");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update move
router.route("/update/:id").post((req, res) => {
  Move.findById(req.params.id)
    .then((move) => {
      const prevAudioName = move.audioName;
      move.name = req.body.name.toLowerCase().trim().replace(/\s+/g, " ");
      move.levelName = req.body.levelName;
      move.steps = req.body.steps;
      move.audioName = req.body.name.replace(/\s/g, "_") + ".mp3";
      move.videoID = req.body.videoID;
      move.videoStart = req.body.videoStart;

      move
        .save()
        .then(() => {
          if (prevAudioName !== move.audioName) {
            deleteAudio(prevAudioName);
            addLevelIfNotExist(move.levelName);
            deleteLevelIfEmpty(move.levelName);
            addAudio(move.name, move.audioName);
          }
          res.json("Move updated!");
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
