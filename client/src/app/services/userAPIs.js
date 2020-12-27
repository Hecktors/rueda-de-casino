import axios from 'axios'

const base = process.env.REACT_APP_BASE || 'http://localhost:3001'

// Get token
export function validateToken(token) {
  return axios
    .post(`${base}/users/validateToken`, null, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

// Get user
export function getUser(token) {
  return axios
    .get(`${base}/users/`, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

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

export async function deleteUser(token) {
  return await axios
    .delete(`${base}/users`, null, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => res)
    .catch((err) => err.response)
}
