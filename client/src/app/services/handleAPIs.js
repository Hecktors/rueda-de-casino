import axios from 'axios'

// const API_URL_MOVES = 'http://localhost:3001/moves'
const API_URL_MOVES = 'http://192.168.1.140:3001/moves'
const API_URL_AUDIO = 'http://localhost:3001/audio/'
//                     http://localhost:3001/moves

// get all moves
export async function getPensum() {
    // console.log("getPensum!!!")
    return await axios.get(API_URL_MOVES)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export async function callAddMoveAPI(move){
    return axios.post(`${API_URL_MOVES}/add`, {
       name: move.name,
       levelName: move.levelName,
       bars: move.bars,
       videoUrl: move.videoUrl,
       videoStart: move.videoStart
    })
    .then(response => response.data)
    .catch(function (error) {
        console.log(error);
    });
}
// get audio

// export function getAudio() {
//     axios.get(`${API_URL_AUDIO}`)
//     .then(response => response)
//     .catch(err => console.log(err))
// }


  // Get move


  // delete move

  // Update move

