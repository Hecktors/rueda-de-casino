const fs = require("fs")

function deleteAudio(audioName) {
  fs.unlink(__dirname + `/../public/audios/${audioName}`, (err) => {
    if (err) throw err
    console.log(`${audioName} was deleted`)
  })
}

module.exports = deleteAudio
