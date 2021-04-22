const User = require("../models/user.model")
const emailCheck = require("../lib/checkEmail")
const checkPassword = require("../lib/checkPassword")
const { comparePasswords } = require("../lib/createPasswordHash")

async function checkRegisterData(email, password, passwordCheck) {
  if (!email || !password || !passwordCheck) {
    return { error: true, msg: "All required field have to been filled." }
  }

  if (!emailCheck(email)) {
    return { error: true, msg: "The entered email is not valid." }
  }

  if (password !== passwordCheck) {
    return { error: true, msg: "The entered passwords are not equal." }
  }

  if (!checkPassword(password)) {
    return {
      error: true,
      msg: "Passord needs a uppercase letter, a lowercase letter, a number and min. 8 characters",
    }
  }

  const existingUser = await User.findOne({ email: email })
  if (existingUser) {
    return { error: true, msg: "User already exists." }
  }
  return { error: false }
}

async function checkLoginData(email, password) {
  if (!email || !password) {
    return { error: true, msg: "All required field have to been filled." }
  }
  return { error: false }
}

module.exports = {
  checkRegisterData,
  checkLoginData,
}
