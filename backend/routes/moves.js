var ObjectID = require("mongodb").ObjectID;
const router = require("express").Router();
const Move = require("../models/move.model");
const getPensum = require("../services/getPensum");
const addAudio = require("../services/addAudio");
const deleteAudio = require("../services/deleteAudio");
const addLevelIfNotExist = require("../services/addLevelIfNotExist");
const deleteLevelIfEmpty = require("../services/deleteLevelIfEmpty");

// Get all moves
router.route("/").get(async (req, res) => {
  console.log("server: ok!");
  const response = await getPensum();
  response.err
    ? res.status(400).json("Error" + response.err)
    : res.json(response.pensum);
});

// Add move
router.route("/add").post((req, res) => {
  const id = new ObjectID();
  const name = req.body.name.toLowerCase().trim().replace(/\s+/g, " ");
  const levelName = req.body.levelName;
  const bars = req.body.bars;
  const audioName = name.replace(/\s/g, "_") + ".mp3";
  const videoUrl = req.body.videoUrl;
  const videoStart = req.body.videoStart;

  const newMove = new Move({
    _id: id,
    name,
    levelName,
    bars,
    audioName,
    videoUrl,
    videoStart,
  });

  console.log(newMove);
  newMove
    .save()
    .then(async () => {
      addAudio(name, audioName);
      addLevelIfNotExist(levelName);
      const response = await getPensum();
      response.err
        ? res.status(400).json("Error" + response.err)
        : res.json(response.pensum);
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
      move.bars = req.body.bars;
      move.audioName = req.body.name.replace(/\s/g, "_") + ".mp3";
      move.videoUrl = req.body.videoUrl;
      move.videoStart = req.body.videoStart;

      move
        .save()
        .then(async () => {
          if (prevAudioName !== move.audioName) {
            deleteAudio(prevAudioName);
            addLevelIfNotExist(move.levelName);
            deleteLevelIfEmpty(move.levelName);
            addAudio(move.name, move.audioName);
          }
          const response = await getPensum();
          response.err
            ? res.status(400).json("Error" + response.err)
            : res.json(response.pensum);
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
