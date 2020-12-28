function addMoveToPensum(pensum, levelName, newMove) {
    pensum.levels.forEach((level, index) => level.name === levelName && pensum.levels[index].moves.push(newMove))
    pensum.markModified('levels');
    return pensum;
}

module.exports = addMoveToPensum