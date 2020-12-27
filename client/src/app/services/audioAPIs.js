const base = process.env.REACT_APP_BASE || 'http://localhost:3001'

// Get multi audios
export function fetchAudios(moveIDs) {
  return moveIDs.map((moveID) => {
    return {
      moveID: moveID,
      audioElement: new Audio(`${base}/audios/${moveID}`),
    }
  })
}
