import { useState, useEffect } from 'react'
import { getAudio } from '../services/audioAPIs'

export default function useAudios(userData, levels) {
  const token = userData.token
  const [audios, setAudios] = useState([])
  const moves = levels.map((level) => level.moves).flat()
  console.log('audios:', audios)

  useEffect(() => {
    async function initfetch() {
      setAudios(
        moves.map((move) => {
          return {
            moveID: move._id,
            audioElement: new Audio(getAudio(token, move.audioName)),
          }
        })
      )
    }
    initfetch()
  }, [levels]) // eslint-disable-line react-hooks/exhaustive-deps

  return audios
}
