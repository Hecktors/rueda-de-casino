import { fetchAudios } from './handleAPIs'

export async function getAudios(pensum) {
  const ids = pensum
    .map((level) => level.moves)
    .flat()
    .map((move) => move._id)
  return await fetchAudios(ids)
}
