import { useState, useEffect } from 'react'
import { getAudio } from '../services/audioAPIs'

export default function useAudios(authData, levels) {
  const [audios, setAudios] = useState([])
  const token = authData.token
  const moves = levels ? levels.map((level) => level.moves).flat() : []

  useEffect(() => {
    levels.length && updateAudios()
  }, [levels]) // eslint-disable-line react-hooks/exhaustive-deps

  async function updateAudios() {
    const fetchedAudios = await Promise.all(
      moves.map(async (move) => {
        let audio = await getAudio(token, move._id)
        const audioUrl = new Audio(audio)
        return {
          moveId: move._id,
          audioElement: audioUrl,
        }
      })
    )
    setAudios(fetchedAudios)
  }

  return { audios }
}
