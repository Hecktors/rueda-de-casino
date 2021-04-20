import checkEmail from "./checkEmail"
import checkPassword from "./checkPassword"

export default function checkRegisterInput({ email, password, passwordCheck }) {
  if (!email && !password && !passwordCheck) {
    return{ result: false, msg: "All required field have to been filled."}
  }

  if (password !== passwordCheck) {
    return { result: false, msg: "The entered passwords are not equal."}
   
  }

  if (!checkPassword(password)) {
    return { result: false, msg: "Password needs a uppercase letter, a lowercase letter, a number and min. 8 characters."}
  }

  if (!checkEmail(email)) {
    return { result: false, msg: "The entered email is not valid."}
  }
  return { result: true}
}