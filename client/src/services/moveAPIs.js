import axios from 'axios'
const BASE = process.env.REACT_APP_BASE

// Get all moves
export function getMoves(token) {
  return axios
    .get(`${BASE}/moves`, { headers: { 'x-auth-token': token } })
    .then((response) => response.data)
    .catch((err) => console.log(err))
}

// Get move
export function getMove(token, moveId) {
  return axios
    .get(`${BASE}/moves/${moveId}`, { headers: { 'x-auth-token': token } })
    .then((response) => response)
    .catch((err) => console.log(err.response))
}

// Add move
export function addMove(token, data) {
  return axios
    .post(`${BASE}/moves/add`, data, { headers: { 'x-auth-token': token } })
    .then((response) => response)
    .catch((err) => err.response)
}

// Update move
export function updateMove(token, moveId, data) {
  return axios
    .post(`${BASE}/moves/update/${moveId}`, data, {
      headers: { 'x-auth-token': token },
    })
    .then((response) => response)
    .catch((err) => err.response)
}

// Delete move
export function deleteMove(token, moveId) {
  return axios
    .delete(`${BASE}/moves/${moveId}`, {
      headers: { 'x-auth-token': token },
    })
    .then((response) => response)
    .catch((err) => err.response)
}
