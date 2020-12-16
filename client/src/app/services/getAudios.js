import { fetchAudios } from './handleAPIs'

export default async function getAudios(pensum) {
  if (!pensum) {
    return
  }
  const ids = pensum
    .map((level) => level.moves)
    .flat()
    .map((move) => move._id)
  return await fetchAudios(ids)
}
