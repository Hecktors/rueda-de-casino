import { useState } from 'react'
import PropTypes from 'prop-types'
import YoutubeVideo from '../components/YoutubeVideo'
import Overlay from '../layout/Overlay'
import ActionWrapper from '../layout/ActionWrapper'
import Layout from '../layout/Layout'
import MoveList from '../components/SelectedMoveList'
import Button from '../components/Button'
import Message from '../components/MessageOverlay'

Home.propTypes = {
  moves: PropTypes.array.isRequired,
  speed: PropTypes.number.isRequired,
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
          <Button
            onClick={() => setVideo({})}
            className="top-right"
            task="abort"
            isSmall
          />
          <YoutubeVideo video={video} />
        </Overlay>
      )}
      <header>
        <div />
        <h1 className="logo">Salsa time!</h1>
        <Button onClick={handleOpenSettings} task="settings" isSmall />
      </header>
      <main>
        <ActionWrapper>
          <MoveList moves={moves} onClick={setVideo} />
        </ActionWrapper>
        {hasNotEnoughMoves && <Message isFirstAppStart={isFirstAppStart} />}
      </main>
      <footer>
        <div />
        <Button
          onClick={() => history.push('/session')}
          task="play"
          isDisabled={hasNotEnoughMoves}
        />
      </footer>
    </Layout>
  )
}
