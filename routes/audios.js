const router = require("express").Router()
const User = require("../models/user.model")
const auth = require("../middleware/auth")
const path = require("path")
const gTTS = require("gtts")


router.get("/:audioname", auth, (req, res) => {
  console.log("audios resquest")
    if(!req.params.audioname) {
      return res.status(400).json({msg: "Invalid resquest"})
    }
    const gtts = new gTTS(req.params.audioname, "es-us");
    console.log("Sending response")
    return gtts.stream().pipe(res);
  });


//   User.findById(req.user)
//     .then(() => {
//       const audioFile =
//       res.sendFile(path.join(__dirname, "../public/audios", move.audioName))
//     })
//     .catch((err) => res.status(400).json("Error: " + err))
// })

module.exports = router
