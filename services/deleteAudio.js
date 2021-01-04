const fs = require("fs")
const path = require("path")
const deleteFolderIfEmpty = require("./deleteFolderIfEmpty")

function deleteAudio(userID, audioName) {
  const dir = path.join(__dirname, `../public/${userID}`)
  const target = dir + "/" + audioName

  fs.unlink(target, (err) => {
    if (err) throw err
    console.log(`${audioName} was deleted`)
    deleteFolderIfEmpty(dir)
  })

  
}

module.exports = deleteAudio
