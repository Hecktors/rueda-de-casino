import axios from 'axios'

const base = process.env.REACT_APP_BASE || 'http://localhost:3001'

// Get audio
export async function getAudio(token, audioName) {
  return await axios
    .get(`${base}/audios/${audioName}`, {
      headers: { 'x-auth-token': token },
    })
    .then((response) => {
      // console.log(response)
      return response.data
    })
    .catch((err) => console.log(err))
}
