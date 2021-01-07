const path = require("path")
const fs = require("fs")
const gTTS = require("gtts")
const { deleteFolderIfEmpty } = require("./handleFiles")

async function saveAudio(userID, move) {
  const dir = path.join(__dirname, `../public/audio/${userID}`)
  !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true })
  const gtts = new gTTS(move.name, "es-us");
  gtts.save(dir + "/" + move.audioName, function (err) {
    if (err) { throw new Error(err) }
    console.log('Audio generated successfully.');
  });
}

function deleteAudio(userID, audioName) {
  const dir = path.join(__dirname, `../public/audio/${userID}`)
  const target = dir + "/" + audioName
  fs.unlink(target, (err) => {
    if (err) throw err
    console.log(`${audioName} was deleted`)
    deleteFolderIfEmpty(dir)
  })
}

function updateAudio(userID, prevAudioName, move) {
  deleteAudio(userID, prevAudioName)
  saveAudio(userID, move)
}

module.exports = {
  saveAudio,
  deleteAudio,
  updateAudio
};