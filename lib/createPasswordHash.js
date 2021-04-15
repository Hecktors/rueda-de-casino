const bcrypt = require("bcryptjs")

async function createPasswordHash(password) {
  const salt = await bcrypt.genSalt()
  return bcrypt.hash(password, salt)
}

async function comparePasswords(password1, password2) {
  return await bcrypt.compare(password1, password2)
}

module.exports = { createPasswordHash, comparePasswords }
