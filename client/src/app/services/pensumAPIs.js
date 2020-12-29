import axios from 'axios'
const base = process.env.REACT_APP_BASE || 'http://localhost:3001'

// Get all moves
export function getPensum(token) {
  console.log('Fetch pensum!')
  return axios
    .get(`${base}/moves`, { headers: { 'x-auth-token': token } })
    .then((res) => res.data)
    .catch((err) => console.log(err))
}
