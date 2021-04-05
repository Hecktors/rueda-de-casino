import axios from 'axios'

const base = process.env.REACT_APP_BASE || 'http://localhost:3001'

export function getAudio(token, moveID) {
  const url = `${base}/audios/${moveID}`
  return axios
    .get(url, {
      headers: { 'x-auth-token': token },
      responseType: 'blob',
    })
    .then((response) => URL.createObjectURL(response.data))
}
