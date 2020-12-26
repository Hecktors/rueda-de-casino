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
    .then(async (res) => {
      if (res.data.msg === 'success') {
        return await loginUser({ email: user.email, password: user.password })
      }
    })
    .catch((err) => console.log(err))
}

export async function loginUser({ email, password }) {
  return await axios
    .post(`${base}/users/login`, {
      email,
      password,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err))
}
