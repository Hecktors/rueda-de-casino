const Move = require("../models/move.model");
const Level = require("../models/level.model");

function deleteLevelIfEmpty(levelName) {
  Move.findOne({ levelName }).then((move) => {
    if (!move) {
      Level.findOneAndDelete({ name: levelName })
        .then(() => console.log(levelName + " deleted."))
        .catch((err) => console.log("Error " + err));
    }
  });
}

module.exports = deleteLevelIfEmpty;
