function checkMoveExistence(pensum, moveName) {
    return pensum.levels.map(level => level.moves).flat().some(move => move.name === moveName)
   
}

module.exports = checkMoveExistence
  