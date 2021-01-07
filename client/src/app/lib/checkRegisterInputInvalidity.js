import checkEmail from "./checkEmail"
import checkPassword from "./checkPassword"

export default function checkRegisterInputInvalidity({ email, password, passwordCheck }) {
  if (!email && !password && !passwordCheck) {
    return "All required field have to been filled."
  }

  if (password !== passwordCheck) {
    return "The entered passwords are not equal."
  }

  if (!checkPassword(password)) {
    return "Passord needs a uppercase letter, a lowercase letter, a number and min. 8 characters"
  }

  if (!checkEmail(email)) {
    return "The entered email is not valid."
  }
  return false
}