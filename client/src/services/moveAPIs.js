import axios from 'axios'
const base = process.env.REACT_APP_BASE || 'http://localhost:3001'

// Get all moves
export function getMoves(token) {
  return axios
    .get(`${base}/moves`, { headers: { 'x-auth-token': token } })
    .then((response) => response.data)
    .catch((err) => console.log(err))
}

// Get move
export function getMove(token, moveId) {
  return axios
    .get(`${base}/moves/${moveId}`, { headers: { 'x-auth-token': token } })
    .then((response) => response)
    .catch((err) => console.log(err.response))
}

// Add move
export function addMove(token, data) {
  return axios
    .post(`${base}/moves/add`, data, { headers: { 'x-auth-token': token } })
    .then((response) => response)
    .catch((err) => err.response)
}

// Update move
export function updateMove(token, moveId, data) {
  return axios
    .post(`${base}/moves/update/${moveId}`, data, {
      headers: { 'x-auth-token': token },
    })
    .then((response) => response)
    .catch((err) => err.response)
}

// Delete move
export function deleteMove(token, moveId) {
  return axios
    .delete(`${base}/moves/${moveId}`, {
      headers: { 'x-auth-token': token },
    })
    .then((response) => response)
    .catch((err) => err.response)
}
