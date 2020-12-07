const gTTS = require("gtts");

function buildAudio(string, name) {
  var gtts = new gTTS(string, "es-us");
  gtts.save(__dirname + `/../data/audio/${name}`, function (err) {
    if (err) {
      throw new Error(err);
    }
    console.log(`File ${name} build successfully`);
  });
}

module.exports = buildAudio;
