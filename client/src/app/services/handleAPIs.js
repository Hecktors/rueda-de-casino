import axios from 'axios'

// const REACT_APP_BASE = 'http://192.168.1.140:3001'
const REACT_APP_BASE = 'http://localhost:3001'

// Get all moves
export async function fetchGetPensum() {
  return axios
    .get(`${REACT_APP_BASE}/moves`)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

// Add move
export async function fetchAddMove(move) {
  return axios
    .post(`${REACT_APP_BASE}/moves/add`, {
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
export async function fetchUpdateMove(move) {
  return axios
    .post(`${REACT_APP_BASE}/moves/update/${move._id}`, {
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
export async function fetchDeleteMove(id) {
  return axios
    .delete(`${REACT_APP_BASE}/moves/${id}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error)
    })
}

// Get multi audios
export async function fetchAudios(moveIDs) {
  return moveIDs.map((moveID) => {
    return {
      moveID: moveID,
      audioElement: new Audio(`${REACT_APP_BASE}/audios/${moveID}`),
    }
  })
}
