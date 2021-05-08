import axios from 'axios'

const BASE = process.env.REACT_APP_BASE

export function fetchAudio(token, moveId) {
  const url = `${BASE}/audios/${moveId}`
  return axios
    .get(url, {
      headers: { 'x-auth-token': token },
      responseType: 'blob',
    })
    .then((response) => {
      return window.URL.createObjectURL(response.data)
    })
}
