import axios from 'axios'
const base = process.env.REACT_APP_BASE || 'http://localhost:3001'

// Add move
export function addMove(token, data) {
  console.log(token, data)
  return axios
    .post(`${base}/moves/add`, data, { headers: { 'x-auth-token': token } })
    .then((response) => {
      console.log(token, response)
      return response.data
    })
    .catch((err) => err.response)
}

// Update move
export function updateMove(move) {
  return axios
    .post(`${base}/moves/update/${move._id}`, {
      name: move.name,
      levelName: move.levelName,
      bars: move.bars,
      videoUrl: move.videoUrl,
      videoStart: move.videoStart,
    })
    .then((response) => response)
    .catch((err) => err.response)
}

// Delete move
export function deleteMove(id) {
  return axios
    .delete(`${base}/moves/${id}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error)
    })
}
