const emailCheck = require("../lib/checkEmail")
const checkPassword = require("../lib/checkPassword")

function checkRegisterData(email, password, passwordCheck) {
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
  return { error: false }
}

module.exports = {
  checkRegisterData,
}
