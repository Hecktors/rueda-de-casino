const path = require("path")
const gTTS = require("gtts")
const fs = require("fs")


function saveAudio(userID, move){
    const dir = path.join(__dirname, `../public/${userID}`)
    !fs.existsSync(dir) && fs.mkdirSync(dir)
    
    const gtts = new gTTS(move.name, "es-us");
    gtts.save(dir + "/" + move.audioName, function (err) {
        if(err) { throw new Error(err) }
        console.log('Audio generated successfully.');
    });

}
module.exports = saveAudio
