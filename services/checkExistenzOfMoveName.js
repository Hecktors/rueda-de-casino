const Move = require("../models/move.model")
const User = require("../models/user.model")

async function checkExistenzOfMoveName(userID, moveName, moveID) {
    const foundUser =  await User.findById(userID)
    return await Move.findOne({name: moveName, _id: { $in: foundUser.moveIDs}})
        .then(move => {
            if(move && moveID && String(move._id) === moveID) {
                return false
            }
            return !!move
        })
        .catch(err => console.log('Error checkNameUniqueness: ', err))
}
module.exports = checkExistenzOfMoveName
