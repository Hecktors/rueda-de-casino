import { fetchAllAudios, fetchAudio } from './handleAPIs'

export async function getAllAudios(pensum) {
  const ids = pensum
    .map((level) => level.moves)
    .flat()
    .map((move) => move._id)
  return await fetchAllAudios(ids)
}

export function updateAudios(audios, pensum) {
  const updatedAudios = [...audios]
  const audioMoveIDs = audios.map((audio) => audio.moveID)
  pensum.forEach((level) =>
    level.moves.map(async (move) => {
      !audioMoveIDs.includes(move._id) &&
        updatedAudios.push({
          moveID: move._id,
          audio: await fetchAudio(move._id),
        })
    })
  )
  return updatedAudios
}

export function deleteAudio(audios, pensum) {
  const moveIDs = pensum
    .map((levels) => levels.moves)
    .flat()
    .map((move) => move._id)
  return audios.filter((audio) => moveIDs.includes(audio.moveID))
}
