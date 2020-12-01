import { useState } from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as SettingsIcon } from '../assets/img/settings.svg'
import { ReactComponent as PlayIcon } from '../assets/img/play.svg'
import { ReactComponent as CancelIcon } from '../assets/img/cancel.svg'
import YoutubeVideo from '../components/YoutubeVideo'
import Overlay from '../layout/Overlay'
import Layout from '../layout/Layout'
import MoveList from '../components/SelectedMoveList'
import Button from '../components/Button'
import Message from '../components/IntroductionMessage'

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
          <Button className="topRight" onClick={() => setVideo({})} isSmall>
            <CancelIcon />
          </Button>
          <YoutubeVideo video={video} />
        </Overlay>
      )}
      <header>
        <div />
        <h1 className="logo">Salsa time!</h1>
        <Button data-testid="btn-settings" onClick={handleOpenSettings} isSmall>
          <SettingsIcon />
        </Button>
      </header>
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
