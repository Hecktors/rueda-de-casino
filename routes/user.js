const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const User = require("../models/user.model")
const Move = require("../models/move.model")
const emailCheck = require("../lib/emailCheck")
const checkPassword = require("../lib/checkPassword")
const { deleteUserAudioFolder } = require("../services/handleFiles")
const createDefaultMoves = require("../services/createDefaultMoves")
const sendEmail = require("../services/sendEmail")
const { json } = require("express")

const router = require("express").Router()

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body

    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: "All required field have to been filled." })
    }

    if (!emailCheck(email)) {
      return res.status(400).json({ msg: "The entered email is not valid." })
    }

    if (password !== passwordCheck) {
      return res.status(400).json({ msg: "The entered passwords are not equal." })
    }

    if (!checkPassword(password)) {
      return res.status(400).json({
        msg: "Passord needs a uppercase letter, a lowercase letter, a number and min. 8 characters",
      })
    }

    const existingUser = await User.findOne({ email: email })

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." })
    }

    if (!displayName) {
      displayName = email
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
      moveIDs: [],
    })

    await newUser
      .save()
      .then(async (user) => await createDefaultMoves(user._id))
      .then((userID) => res.json({ msg: userID }))
      .catch((err) => res.status(404).json({ msg: err.message }))
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ msg: "All required field have to been filled." })
    }

    const user = await User.findOne({ email: email })

    if (!user) {
      return res.status(400).json({ msg: "Account with this email doesn't exists" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ token, user: { id: user._id, displayName: user.displayName } })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

router.delete("/", auth, async (req, res) => {
  try {
    User.findByIdAndDelete(req.user).then((deletedUser) => {
      Move.deleteMany(
        {
          _id: {
            $in: deletedUser.moveIDs,
          },
        },
        function (err, result) {
          if (err) {
            console.log(err)
          } else {
            console.log("Deleted successful! ", deletedUser.moveIDs)
            deleteUserAudioFolder(req.user)
            res.json({ msg: `User acount of ${deletedUser.email} has been deleted.` })
          }
        }
      )
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/validateToken", async (req, res) => {
  try {
    const token = req.header("x-auth-token")
    if (!token) {
      return res.json(false)
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) {
      return res.json(false)
    }

    const user = await User.findById(verified.id)
    if (!user) {
      return res.json(false)
    }

    res.json(true)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user)
  res.json({
    id: user._id,
    displayName: user.displayName,
  })
})

router.put("/forgot-password", (req, res) => {
  const { email } = req.body
  User.findOne({ email })
    .then((user) => {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" })
      const base = process.env.CLIENT_URL || "https://localhost:3000"
      const url = `${base}/authentication/activate/${token}`
      const emailData = {
        from: "Salsatime Admin <no-reply@hecktors.de>",
        to: "to-beck@gmx.de",
        subject: "Your password reset link from salsatime",
        html: `<p>Please click <a href="${url}">here</a> to reset your password </p>`,
      }

      user.updateOne({ resetLink: token }, async (err) => {
        if (!err) {
          res.json({ msg: token })
          const sendEmailResponse = await sendEmail(emailData)
          sendEmailResponse
            ? res.json({ msg: `Reset link has been sent to ${user.email}` })
            : res.status(500).json({ errorMsg: "Email sending failed, please try again" })
        } else {
          return res.status(400).json({ error: "Reset password link error" })
        }
      })
    })
    .catch((err) => res.status(500).json({ errorMsg: err }))
})

module.exports = router
