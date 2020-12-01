import { useState } from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as SettingsIcon } from '../assets/img/settings.svg'
import { ReactComponent as PlayIcon } from '../assets/img/play.svg'
import Video from '../components/Video'
import Layout from '../components/UI/Layout'
import Header from '../components/Header'
import MoveList from '../components/MoveList'
import Button from '../components/Button'
import Message from '../components/Message'
import Overlay from '../components/UI/Overlay'

Home.propTypes = {
  moves: PropTypes.array.isRequired,
  speed: PropTypes.number,
  isFirstAppStart: PropTypes.bool.isRequired,
  setIsFirstAppStart: PropTypes.func.isRequired,
}

export default function Home({
  history,
  moves,
  isFirstAppStart,
  setIsFirstAppStart,
}) {
  const [video, setVideo] = useState({})
  const hasNotEnoughMoves = moves.length < 2

  function handleOpenSettings() {
    history.push('/settings')
    setIsFirstAppStart(false)
  }

  return (
    <Layout>
      {video.id && (
        <Overlay>
          <div className="overlay">
            <Video video={video} onClick={() => setVideo({})} />
          </div>
        </Overlay>
      )}
      <Header>
        <div />
        <h1 className="logo">Salsa time!</h1>
        <Button data-testid="btn-settings" onClick={handleOpenSettings} isSmall>
          <SettingsIcon />
        </Button>
      </Header>
      <main>
        <MoveList moves={moves} onClick={setVideo} />
        {hasNotEnoughMoves && <Message isFirstAppStart={isFirstAppStart} />}
      </main>
      <footer>
        <Button
          onClick={() => history.push('/session')}
          isDisabled={hasNotEnoughMoves}
        >
          <PlayIcon />
        </Button>
      </footer>
    </Layout>
  )
}
