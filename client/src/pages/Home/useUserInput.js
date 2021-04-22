export default function useUserInput(levels, appState, setAppState) {
  const selectedMoves = appState.selectedMoveIds
    ? levels
        .map((level) => level.moves)
        .filter((move) => appState.selectedMoveIds.includes(move._id))
    : []

  function updateAppState(event) {
    const { name, value } = event.target
    appStateHandler[name](value)
  }

  const appStateHandler = {
    move: (value) => {
      const updatedMoveIds = appState.selectedMoveIds.includes(value)
        ? appState.selectedMoveIds.filter((moveId) => moveId !== value)
        : [...appState.selectedMoveIds, value]
      setAppState({ ...appState, selectedMoveIds: updatedMoveIds })
    },
  }

  function resetAppState() {
    setAppState({ ...appState, selectedMoveIds: [] })
  }

  return { selectedMoves, updateAppState, resetAppState }
}
