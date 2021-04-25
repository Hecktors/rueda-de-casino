import axios from 'axios'

const base = process.env.REACT_APP_BASE || 'http://localhost:3001'

// Get token
export function fetchTokenVerification(token) {
  return axios
    .post(`${base}/users/token-verification`, null, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => res)
    .catch((err) => console.log(err))
}

// Get user
export function fetchUser(token) {
  return axios
    .get(`${base}/users/`, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => res)
    .catch((err) => console.log(err))
}

// Register user
export async function fetchUserRegister(user) {
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

// Login user
export async function fetchUserLogin({ email, password }) {
  return await axios
    .post(`${base}/users/login`, {
      email,
      password,
    })
    .then((res) => res)
    .catch((err) => err.response)
}

// Delete user
export async function fetchUserAccountDelete(token) {
  return await axios
    .delete(`${base}/users`, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => res)
    .catch((err) => err.response)
}

// Send Password Reset Code
export async function fetchPasswordReset(email) {
  return await axios
    .put(`${base}/users/password-reset`, {
      email,
    })
    .then((res) => res)
    .catch((err) => err.response)
}

// Change Password
export async function fetchPasswordRenew(resetToken, password, passwordCheck) {
  return await axios
    .put(`${base}/users/password-renew`, {
      resetToken,
      password,
      passwordCheck,
    })
    .then((res) => res)
    .catch((err) => err.response)
}
