import { useEffect, useState } from 'react'
import { getPensum } from './services/handleAPIs'
import { getLocalStorage, setLocalStorage } from './services/localStorage'

const STORAGE_KEY = 'pensum'

export default function useAppState(levels) {
  const [pensum, setPensum] = useState([])
  console.log(pensum)

  useEffect(() => {
    async function fetchCall() {
    //   const fetchedPensum = await getPensum()
    //   console.log(fetchedPensum)
      // setPensum(getLocalStorage(STORAGE_KEY) ?? await getPensum())
      setPensum(await getPensum())
    }
    fetchCall()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLocalStorage(STORAGE_KEY, pensum)
  }, [pensum])

//   const selectedMoves = appState.selectedMoveIDs
//     ? levels
//         .map((level) => level.moves)
//         .flat(1)
//         .filter((move) => appState.selectedMoveIDs.includes(move.id))
//     : []

  // function updateAppState(event) {
  //   const { name, value, checked } = event.target
  //   appStateHandler[name](value, checked)
  // }

//   const appStateHandler = {
//     move: (value) => {
//       const updatedMoveIDs = appState.selectedMoveIDs.includes(value)
//         ? appState.selectedMoveIDs.filter((moveID) => moveID !== value)
//         : [...appState.selectedMoveIDs, value]
//       setAppState({ ...appState, selectedMoveIDs: updatedMoveIDs })
//     },
//     speed: (value) => setAppState({ ...appState, speed: Number(value) }),
//     songActivity: (_, checked) => {
//       setAppState({ ...appState, isSongActive: checked })
//     },
//   }

//   function resetAppState() {
//     setAppState(initState)
//   }

  return [pensum, setPensum]
}
