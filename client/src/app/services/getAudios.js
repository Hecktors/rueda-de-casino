import { fetchAudios } from './handleAPIs'

export default async function getAudios(pensum) {
  console.log(pensum)
  const ids = pensum
    .map((level) => level.moves)
    .flat()
    .map((move) => move._id)
  return await fetchAudios(ids)
}
