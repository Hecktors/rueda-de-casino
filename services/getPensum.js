const Move = require("../models/move.model");
const Level = require("../models/level.model");

async function getPensum() {
  let movesData = [];
  let response = { response: { err: "", pensum: [] } };
  await Move.find()
    .then((moves) => (movesData = moves))
    .catch((err) => (response.err = err));
  await Level.find()
    .then((levels) => {
      const pensum = levels.map((level) => {
        return {
          id: level.id,
          levelName: level.name,
          moves: movesData.filter((move) => move.levelName === level.name),
        };
      });
      response.pensum = pensum;
    })
    .catch((err) => (response.err = "Error: " + err));
  return response;
}

module.exports = getPensum;
