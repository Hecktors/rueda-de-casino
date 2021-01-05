const initState = {
  selectedMoveIDs: [],
  speed: 2900,
  isSongActive: true,
}

export default function useUserInput(levels, appState, setAppState) {
  const selectedMoves = appState.selectedMoveIDs
    ? levels
        .map((level) => level.moves)
        .filter((move) => appState.selectedMoveIDs.includes(move._id))
    : []

  function updateAppState(event) {
    const { name, value, checked } = event.target
    appStateHandler[name](value, checked)
  }

  const appStateHandler = {
    move: (value) => {
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
