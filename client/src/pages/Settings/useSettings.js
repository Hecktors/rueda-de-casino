import { useContext } from 'react'
import { Context } from '../../context/Context'

export default function useSettings() {
  const {
    appState,
    deferredPrompt,
    setAppState,
    setDeferredPrompt,
  } = useContext(Context)

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

  function installApp() {
    if (deferredPrompt) {
      deferredPrompt.prompt()

      deferredPrompt.userChoice.then(function (choiceResult) {
        console.log(choiceResult.outcome)

        if (choiceResult.outcome === 'dismissed') {
          console.log('User cancelled installation')
        } else {
          console.log('User added to home screen')
        }
      })

      setDeferredPrompt(null)
    }
  }

  return { appState, deferredPrompt, updateAppState, installApp }
}
