const path = require("path")
const fs = require("fs")
const gTTS = require("gtts")
const { deleteFolderIfEmpty } = require("./handleFiles")

async function saveAudio(userId, move) {
  const dir = path.join(__dirname, `../public/audio/${userId}`)
  !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true })
  const gtts = new gTTS(move.name, "es-us")
  gtts.save(dir + "/" + move.audioName, function (err) {
    if (err) {
      throw new Error(err)
    }
    console.log("Audio generated successfully.")
  })
  return true
}

function deleteAudio(userId, audioName) {
  const dir = path.join(__dirname, `../public/audio/${userId}`)
  const target = dir + "/" + audioName
  fs.unlink(target, (err) => {
    if (err) throw err
    console.log(`${audioName} was deleted`)
    deleteFolderIfEmpty(dir)
  })
}

function updateAudio(userId, prevAudioName, move) {
  deleteAudio(userId, prevAudioName)
  saveAudio(userId, move)
}

module.exports = {
  saveAudio,
  deleteAudio,
  updateAudio,
}
