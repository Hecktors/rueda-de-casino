const Level = require("../models/level.model")

function addLevelIfNotExist(pensum, levelName) {
  let hasLevel = pensum.levels.find(level => level.name === levelName)
  if(!hasLevel) {
    const newLevel = new Level({name: levelName})
    pensum.levels.push(newLevel)
  }
  return pensum
}

module.exports = addLevelIfNotExist
