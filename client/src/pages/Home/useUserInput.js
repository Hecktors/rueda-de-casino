export default function useUserInput(levels, appState, setAppState) {
  const selectedMoves = appState.selectedMoveIDs
    ? levels
      .map((level) => level.moves)
      .filter((move) => appState.selectedMoveIDs.includes(move._id))
    : []

  function updateAppState(event) {
    const { name, value } = event.target
    appStateHandler[name](value)
  }

  const appStateHandler = {
    move: (value) => {
      const updatedMoveIDs = appState.selectedMoveIDs.includes(value)
        ? appState.selectedMoveIDs.filter((moveID) => moveID !== value)
        : [...appState.selectedMoveIDs, value]
      setAppState({ ...appState, selectedMoveIDs: updatedMoveIDs })
    },
  }

  function resetAppState() {
    setAppState({ ...appState, selectedMoveIDs: [] })
  }

  return { selectedMoves, updateAppState, resetAppState }
}
