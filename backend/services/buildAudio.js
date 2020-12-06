const gTTS = require("gtts");

function buildAudio(string, name) {
  var gtts = new gTTS(string, "es-us");
  gtts.save(__dirname + `/../data/audio/${name}.mp3`, function (err, result) {
    if (err) {
      throw new Error(err);
    }
    console.log(`File ${name}.mp3 build successfully`);
  });
}

module.exports = buildAudio;
