const fs = require("fs")
const path = require("path")

async function checkExistenzOfAudio(path) {
  try {
    if (fs.existsSync(path)) {
      console.log("file exists", path)
      return true
    }
    return false
  } catch (err) {
    console.error(err)
    return false
  }
}

function deleteFolderIfEmpty(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.log(err)
    } else {
      !files.length && fs.rmdirSync(dir)
    }
  })
}

function deleteUserAudioFolder(userId) {
  const dir = path.join(__dirname, `../public/audio/${userId}`)
  fs.rmdirSync(dir, { recursive: true }, (err) => {
    if (err) throw err
    console.log(`Audio folder of user ${userId} was deleted`)
  })
}

module.exports = {
  deleteUserAudioFolder,
  checkExistenzOfAudio,
  deleteFolderIfEmpty,
}
