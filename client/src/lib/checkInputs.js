import checkEmail from './checkEmail'
import checkPassword from './checkPassword'

export default function getInputErrors(userInput) {
  if (userInput.email) {
    const err = getEmailError(userInput.email)
    if (err) {
      return err
    }
  }

  if (userInput.passwordCheck) {
    const err = getNewPasswordError(userInput.password, userInput.passwordCheck)
    if (err) {
      return err
    }
  } else if (userInput.password) {
    const err = getPasswordError(userInput.password)
    if (err) {
      return err
    }
  }
  return false
}

export function getEmailError(email) {
  if (!email) {
    return 'Email address is required.'
  }

  if (!checkEmail(email)) {
    return 'The email address is not valid.'
  }
  return false
}

export function getPasswordError(password) {
  if (!password) {
    return 'Password is required.'
  }
  return false
}

export function getNewPasswordError(password, passwordCheck) {
  if (!password || !passwordCheck) {
    return 'All Passwords are required.'
  }

  if (!checkPassword(password)) {
    return 'Password needs a uppercase letter, a lowercase letter, a number and min. 8 characters.'
  }

  if (password !== passwordCheck) {
    return 'The entered passwords are not equal.'
  }
  return false
}
