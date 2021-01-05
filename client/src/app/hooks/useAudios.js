import { useState, useEffect } from 'react'
import { getAudio } from '../services/audioAPIs'

export default function useAudios(userData, levels) {
  const token = userData.token
  const [audios, setAudios] = useState([])
  const moves = levels ? levels.map((level) => level.moves).flat() : []

  useEffect(() => {
    if (levels.length) {
      updateAudios()
    }
  }, [levels]) // eslint-disable-line react-hooks/exhaustive-deps

  async function updateAudios() {
    const fetchedAudios = []
    await moves.forEach(async (move) => {
      let audio = await getAudio(token, move._id)
      const audioUrl = new Audio(audio)
      fetchedAudios.push({
        moveID: move._id,
        audioElement: audioUrl,
      })
      setAudios(fetchedAudios)
    })
  }

  return audios
}
