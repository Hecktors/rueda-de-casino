// const Pensum = require('../models/pensum.model')

// function addMove(userID, newMove) {
//     Pensum.findOne({userID: userID})
//     .then(pensum => {
//         pensum.levels.forEach((level, index) => {
//             level.name === newMove.levelName && pensum.levels[index].moves.push(newMove)
//         })
//         pensum.markModified('levels');
//         pensum.save()
//     })
// }

// module.exports = addMove