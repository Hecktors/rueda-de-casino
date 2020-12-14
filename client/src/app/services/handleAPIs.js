import axios from 'axios'

// const API_URL = 'http://192.168.1.140:3001'
const API_URL = 'http://localhost:3001'

// Get all moves
export async function fetchGetPensum() {
  return axios
    .get(`${API_URL}/moves`)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

// Add move
export async function fetchAddMove(move) {
  return axios
    .post(`${API_URL}/moves/add`, {
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
    .post(`${API_URL}/moves/update/${move._id}`, {
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
    .delete(`${API_URL}/moves/${id}`)
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
      audioElement: new Audio(`${API_URL}/audios/${moveID}`),
    }
  })
}
