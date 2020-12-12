import axios from 'axios'

const API_URL_MOVES = 'http://192.168.1.140:3001/moves'
const API_URL_AUDIO = 'http://192.168.1.140:3001/audio/'

// get all moves
export async function fetchGetPensum() {
  return axios
    .get(API_URL_MOVES)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export async function fetchAddMove(move) {
  return axios
    .post(`${API_URL_MOVES}/add`, {
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
export async function fetchUpdateMove(move) {
  return axios
    .post(`${API_URL_MOVES}/update/${move._id}`, {
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
export async function fetchDeleteMove(id) {
  return axios
    .delete(`${API_URL_MOVES}/${id}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error)
    })
}

// get audio
export function fetchAudio(moveID) {
  return new Audio(`${API_URL_AUDIO}${moveID}`)
}
// get multi audios
export function fetchAllAudios(moveIDs) {
  return moveIDs.map((moveID) => {
    return { moveID: moveID, audio: new Audio(`${API_URL_AUDIO}${moveID}`) }
  })
}
