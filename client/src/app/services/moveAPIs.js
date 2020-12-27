import axios from 'axios'
const base = process.env.REACT_APP_BASE || 'http://localhost:3001'

// Get all moves
export function fetchGetPensum() {
  return axios
    .get(`${base}/moves`)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

// Add move
export function fetchAddMove(move) {
  return axios
    .post(`${base}/moves/add`, {
      name: move.name,
      levelName: move.levelName,
      bars: move.bars,
      videoUrl: move.videoUrl,
      videoStart: move.videoStart,
    })
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

// Update move
export function fetchUpdateMove(move) {
  return axios
    .post(`${base}/moves/update/${move._id}`, {
      name: move.name,
      levelName: move.levelName,
      bars: move.bars,
      videoUrl: move.videoUrl,
      videoStart: move.videoStart,
    })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error)
    })
}

// Delete move
export function fetchDeleteMove(id) {
  return axios
    .delete(`${base}/moves/${id}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error)
    })
}
