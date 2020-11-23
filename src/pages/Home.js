import { useEffect, useState } from 'react'
import getLocalStorage from '../lib/getLocalStorage'
import Layout from '../components/Layout'
import Header from '../components/Header'
import MoveList from '../components/MoveList'
import Button from '../components/Button'

import { ReactComponent as SettingsIcon } from '../assets/img/settings.svg'
import { ReactComponent as PlayIcon } from '../assets/img/play.svg'

export default function Home(props) {
  const [selectedMoves, setSelectedMoves] = useState([])
  const isNoReady = selectedMoves.length < 2

  useEffect(() => {
    setSelectedMoves(getLocalStorage('selectedMoves') ?? [])
  }, [])

  function startSession() {
    props.history.push('/session')
  }

  function openSettings() {
    props.history.push('/settings')
  }

  const message =
    selectedMoves.length < 2 ? (
      <div className="msg warning">Select at least 2 moves to start</div>
    ) : (
      <div className="msg success">Ready? Click Play to start!</div>
    )

  return (
    <Layout>
      <Header title="Salsa time">
        <div />
        <h1 className="logo">Salsa time!</h1>
        <Button onClick={openSettings} isSmall>
          <SettingsIcon />
        </Button>
      </Header>
      <main>
        {message}
        <MoveList moves={selectedMoves} />
      </main>
      <footer>
        <Button onClick={startSession} isDisabled={isNoReady}>
          <PlayIcon />
        </Button>
      </footer>
    </Layout>
  )
}
