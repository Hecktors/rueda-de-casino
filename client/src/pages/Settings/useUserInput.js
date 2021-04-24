export default function useUserInput(appState, setAppState) {
  function updateAppState(event) {
    const { name, value, checked } = event.target
    appStateHandler[name](value, checked)
  }

  const appStateHandler = {
    speed: (value) => setAppState({ ...appState, speed: Number(value) }),
    songActivity: (_, checked) => {
      setAppState({ ...appState, isSongActive: checked })
    },
    runThroughSelection: (_, checked) => {
      setAppState({ ...appState, noRepetition: checked })
    },
  }

  return { updateAppState }
}
