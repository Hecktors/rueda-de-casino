function checkPassword(password) {
  // contains lowercase letter, uppercase letter, number, min length of 8
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  return re.test(password)
}

module.exports = checkPassword