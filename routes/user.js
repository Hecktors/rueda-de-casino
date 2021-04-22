const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const User = require("../models/user.model")
const Move = require("../models/move.model")
const { deleteUserAudioFolder } = require("../services/handleFiles")
const createDefaultMoves = require("../services/createDefaultMoves")
const sendEmail = require("../services/sendEmail")
const { checkRegisterData, checkLoginData } = require("../services/validateUserData")
const { createPasswordHash, comparePasswords } = require("../lib/createPasswordHash")

const router = require("express").Router()

router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, displayName } = req.body

    const checkResult = checkRegisterData(email, password, passwordCheck)
    if (checkResult.error) {
      return res.status(400).json({ msg: checkResult.msg })
    }

    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ msg: "Account with this email already exists" })
    }

    const newUser = new User({
      email,
      password: await createPasswordHash(password),
      displayName: displayName ? displayName : email,
      moveIds: [],
    })

    // return res.json({ msg: newUser })

    newUser
      .save()
      .then(async (user) => {
        await createDefaultMoves(user._id)
        return user._id
      })
      .then((userId) => res.json({ msg: userId }))
      .catch((err) => res.status(404).json({ msg: err.message }))
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const checkLogin = checkLoginData(email, password)
    if (checkLogin.error) {
      return res.status(400).json({ msg: checkLogin.msg })
    }

    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ msg: "Account with this email doesn't exists" })
    }

    const isMatch = await comparePasswords(password, user.password)
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
            $in: deletedUser.moveIds,
          },
        },
        function (err, result) {
          if (!err) {
            console.log("Account has been deleted successful! ", deletedUser.moveIds)
            deleteUserAudioFolder(req.user)
            res.json({ msg: `User acount of ${deletedUser.email} has been deleted.` })
          } else {
            res.status(500).json({ error: err.message })
          }
        }
      )
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/token-verification", async (req, res) => {
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

router.put("/password-reset", (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ msg: "The email field has to been filled." })
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ msg: "Account with this email doesn't exists" })
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" })
      const base = process.env.CLIENT_URL || "https://localhost:3000"
      const url = `${base}/password-renew/${token}`
      const emailData = {
        from: `Salsatime Admin <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your password reset link from salsatime",
        html: `<p>Please click <a href="${url}">here</a> to reset your password of your Salsatime account</p>`,
      }

      user.updateOne({ resetToken: token }, async (err) => {
        if (!err) {
          const sendEmailResponse = await sendEmail(emailData)
          sendEmailResponse
            ? res.json({ msg: `Reset link has been sent to ${user.email}` })
            : res.status(500).json({ errorMsg: "Email sending failed, please try again" })
        } else {
          rres.status(400).json({ error: "Reset password link error" })
        }
      })
    })
    .catch((err) => res.status(500).json({ errorMsg: err }))
})

router.put("/password-renew", async (req, res) => {
  const { resetToken, password, passwordCheck } = req.body
  if (!resetToken || !password || !passwordCheck) {
    return res.status(400).json({ msg: "All required field have to been filled." })
  }

  if (password !== passwordCheck) {
    return res.status(400).json({ msg: "The entered passwords are not equal." })
  }
  jwt.verify(resetToken, process.env.JWT_SECRET, async (err, decodedData) => {
    if (err) {
      return res.status(400).json({ msg: "Link includes wrong code or is expired." })
    }

    User.findOne({ resetToken })
      .then(async (user) => {
        user.password = await createPasswordHash(password)
        user.resetToken = ""
        user
          .save()
          .then((user) => res.json({ email: user.email }))
          .catch((err) => res.status(400).json({ msg: err.message }))
      })
      .catch((err) => res.status(400).json({ msg: "Link includes wrong code or is expired..." }))
  })
})

module.exports = router
