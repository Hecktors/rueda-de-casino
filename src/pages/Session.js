import { useState } from 'react'
import PropTypes from 'prop-types'
import Layout from '../layout/Layout'
import Overlay from '../layout/Overlay'
import Button from '../components/Button'
import MoveList from '../components/SelectedMoveList'
import CurrentMove from '../components/CurrentMove'
import YoutubeVideo from '../components/YoutubeVideo'
import BackgroundVideo from '../components/BackgroundVideo'
import PlayActionWrapper from '../layout/PlayActionWrapper'
import useSession from '../hooks/useSession'

Session.propTypes = {
  history: PropTypes.object.isRequired,
  moves: PropTypes.array.isRequired,
  speed: PropTypes.number,
  isMuted: PropTypes.bool.isRequired,
}

export default function Session({ history, moves, speed, isMuted }) {
  const [sessionHandler, isPlaying, currentMove] = useSession(
    history,
    moves,
    speed,
    isMuted
  )

  const [video, setVideo] = useState({})
  return (
    <Layout>
      {video.id && (
        <Overlay full>
          <Button
            className="topRight"
            onClick={() => setVideo({})}
            task="abort"
            isSmall
          />
          <YoutubeVideo video={video} />
        </Overlay>
      )}
      <header className={'dark'}>
        <div />
        {!isPlaying && <h1>Pause</h1>}
      </header>
      <main className="dark">
        <PlayActionWrapper>
          <BackgroundVideo isPlaying={isPlaying} />
          <Overlay>
            {currentMove.id && <CurrentMove name={currentMove.name} />}
            {!isPlaying && <MoveList moves={moves} onClick={setVideo} />}
          </Overlay>
        </PlayActionWrapper>
      </main>
      <footer className={'dark'}>
        {!isPlaying ? (
          <Button onClick={sessionHandler.stop} task="stop" isSmall />
        ) : (
          <div />
        )}
        <Button
          onClick={isPlaying ? sessionHandler.pause : sessionHandler.play}
          task={isPlaying ? 'pause' : 'play'}
        />
      </footer>
    </Layout>
  )
}
