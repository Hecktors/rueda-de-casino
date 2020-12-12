import axios from 'axios'

// const API_URL_MOVES = 'http://localhost:3001/moves'
const API_URL_MOVES = 'http://192.168.1.140:3001/moves'
const API_URL_AUDIO = 'http://localhost:3001/audio/'
//                     http://localhost:3001/moves

// get all moves
export async function getPensum() {
    console.log("getPensum!!!")
    return await axios.get(API_URL_MOVES)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// get audio

export function getAudio() {
    axios.get(`${API_URL_AUDIO}`)
    .then(response => response)
    .catch(err => console.log(err))
}

    

export function addMove(move){
    axios.post(`${API_URL_MOVES}/moves/add`, {
        firstName: 'Fred',
        lastName: 'Flintstone'
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

  // Get move


  // delete move

  // Update move

