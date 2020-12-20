const Level = require("../models/level.model")

function addLevelIfNotExist(levelName) {
  Level.findOne({ name: levelName })
    .then((level) => {
      if (!level) {
        const newLevel = new Level({ name: levelName })
        newLevel
          .save()
          .then(() => console.log(levelName + " added"))
          .catch((err) => console.log(err))
      }
    })
    .catch((err) => console.log(err))
}

module.exports = addLevelIfNotExist
