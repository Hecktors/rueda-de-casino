import { useState, useEffect } from 'react'
import { getAudio } from '../services/audioAPIs'

export default function useAudios(userData, levels) {
  const token = userData.token
  const [audios, setAudios] = useState([])
  const moves = levels.map((level) => level.moves).flat()

  useEffect(() => {
    async function fetchData() {
      const updatedAudios = []
      moves.forEach(async (move) => {
        const response = await getAudio(token, move.audioName)
        updatedAudios.push({
          moveID: move._id,
          audioElement: new Audio(response),
        })
      })
      setAudios(updatedAudios)
    }
    fetchData()
  }, [levels]) // eslint-disable-line react-hooks/exhaustive-deps

  return audios
}
