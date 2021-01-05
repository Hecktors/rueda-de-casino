const router = require("express").Router()
const auth = require("../middleware/auth")
const path = require("path")

router.get("/:audioName", auth,(req, res) => {
  const audioName = req.params.audioName
    if(!audioName) {
      return res.status(400).json({msg: "Invalid resquest"})
    }
    res.sendFile(path.join(__dirname, `../public/${req.user}/${audioName}`))
  });

module.exports = router
