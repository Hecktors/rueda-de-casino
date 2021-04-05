import axios from 'axios'

const base = process.env.REACT_APP_BASE || 'http://localhost:3001'

export async function getAudio(token, moveID) {
  const url = `${base}/audios/${moveID}`
  return await axios
    .get(url, {
      headers: { 'x-auth-token': token },
      responseType: 'blob',
    })
    .then(async (response) => window.URL.createObjectURL(response.data))
}
