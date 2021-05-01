import axios from 'axios'

const base = process.env.REACT_APP_BASE || 'http://localhost:3001'

export function fetchAudio(token, moveId) {
  const url = `${base}/audios/${moveId}`
  return axios
    .get(url, {
      headers: { 'x-auth-token': token },
      responseType: 'blob',
    })
    .then((response) => {
      return window.URL.createObjectURL(response.data)
    })
}
