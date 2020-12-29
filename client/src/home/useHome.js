const initState = {
  selectedMoveIDs: [],
  speed: 2900,
  isSongActive: true,
}

export default function useHome(pensum, appState, setAppState) {
  const selectedMoves = appState.selectedMoveIDs
    ? pensum
        .map((level) => level.moves)
        .flat(1)
        .filter((move) => appState.selectedMoveIDs.includes(move._id))
    : []

  function updateAppState(event) {
    const { name, value, checked } = event.target
    appStateHandler[name](value, checked)
  }

  const appStateHandler = {
    move: (value) => {
      const updatedSelectedMoves = appState.selectedMoves
        .map((move) => move.id)
        .flat()
        .includes(value)
        ? appState.updatedSelectedMoves.filter((move) => move._id !== value)
        : [...appState.updatedSelectedMoves, value]
      setAppState({ ...appState, selectedMoveIDs: updatedSelectedMoves })

      const updatedMoveIDs = appState.selectedMoveIDs.includes(value)
        ? appState.selectedMoveIDs.filter((moveID) => moveID !== value)
        : [...appState.selectedMoveIDs, value]
      setAppState({ ...appState, selectedMoveIDs: updatedMoveIDs })
    },
    speed: (value) => setAppState({ ...appState, speed: Number(value) }),
    songActivity: (_, checked) => {
      setAppState({ ...appState, isSongActive: checked })
    },
  }

  function resetAppState() {
    setAppState(initState)
  }

  return { selectedMoves, updateAppState, resetAppState }
}
