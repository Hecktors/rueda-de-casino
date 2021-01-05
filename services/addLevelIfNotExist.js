const Pensum = require("../models/pensum.model")
const Level = require("../models/level.model")

async function addLevelIfNotExist(userID, levelName) {
  return await Pensum.findOne({userID: userID})
  .then(pensum => {
    let hasLevel = pensum.levels.find(level => level.name === levelName)
    if(!hasLevel) {
      const newLevel = new Level({name: levelName})
      pensum.levels.push(newLevel)
    }
    pensum.save()
  })
}

module.exports = addLevelIfNotExist
