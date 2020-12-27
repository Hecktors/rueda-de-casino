import axios from 'axios'

const base = process.env.REACT_APP_BASE || 'http://localhost:3001'

export async function registerUser(user) {
  return await axios
    .post(`${base}/users/register`, {
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      passwordCheck: user.passwordCheck,
    })
    .then((res) => res)
    .catch((err) => err.response)
}

export async function loginUser({ email, password }) {
  return await axios
    .post(`${base}/users/login`, {
      email,
      password,
    })
    .then((res) => res)
    .catch((err) => err.response)
}
