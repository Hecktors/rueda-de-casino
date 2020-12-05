import { useState } from 'react'
import PropTypes from 'prop-types'
import useSession from '../hooks/useSession'
import Layout from '../layout/Layout'
import Overlay from '../layout/Overlay'
import Button from '../components/Button'
import MoveList from '../components/SelectedMoveList'
import CurrentMove from '../components/CurrentMove'
import YoutubeVideo from '../components/YoutubeVideo'
import BackgroundVideo from '../components/BackgroundVideo'
import ActionWrapper from '../layout/ActionWrapper'

Session.propTypes = {
  history: PropTypes.object.isRequired,
  moves: PropTypes.array.isRequired,
  speed: PropTypes.number,
  isSongActive: PropTypes.bool.isRequired,
}

export default function Session({ history, moves, speed, isSongActive }) {
  const [sessionHandler, isPlaying, currentMove] = useSession(
    history,
    moves,
    speed,
    isSongActive
  )

  const [video, setVideo] = useState({})

  return (
    <Layout>
      {video.id && (
        <Overlay full>
          <Button
            className="top-right"
            onClick={() => setVideo({})}
            task="abort"
            isSmall
          />
          <YoutubeVideo video={video} />
        </Overlay>
      )}
      <header className={'dark'}>
        {!isPlaying ? (
          <Button onClick={sessionHandler.stop} task="stop" isSmall />
        ) : (
          <div />
        )}
        {!isPlaying && <h1>Pause</h1>}
      </header>
      <main className="dark">
        <ActionWrapper isDark>
          <BackgroundVideo isPlaying={isPlaying} />
          <Overlay>
            {currentMove.id && <CurrentMove name={currentMove.name} />}
            {!isPlaying && <MoveList moves={moves} onClick={setVideo} />}
          </Overlay>
        </ActionWrapper>
      </main>
      <footer className={'dark'}>
        <div />
        <Button
          onClick={isPlaying ? sessionHandler.pause : sessionHandler.play}
          task={isPlaying ? 'pause' : 'play'}
          isPrimary
        />
      </footer>
    </Layout>
  )
}
