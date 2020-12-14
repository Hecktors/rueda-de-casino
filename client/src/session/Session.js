import { useState } from 'react'
import PropTypes from 'prop-types'
import useSession from './useSession'
import AppHeader from '../app/AppHeader'
import AppFooter from '../app/AppFooter'
import IconButton from '../app/Buttons/IconButton'
import Overlay from '../app/Overlay'
import SelectedMoveList from './SelectedMoveList/SelectedMoveList'
import CurrentMove from './CurrentMove/CurrentMove'
import YoutubeVideo from './YoutubeVideo/YoutubeVideo'
import BackgroundVideo from './BackgroundVideo/BackgroundVideo'
import { CancelIcon, PauseIcon, PlayIcon, StopIcon } from '../app/Icons/Icons'

Session.propTypes = {
  history: PropTypes.object.isRequired,
  moves: PropTypes.array.isRequired,
  audios: PropTypes.array.isRequired,
  speed: PropTypes.number,
  isSongActive: PropTypes.bool.isRequired,
}

export default function Session({
  history,
  moves,
  audios,
  speed,
  isSongActive,
}) {
  const [sessionHandler, isPlaying, currentMove] = useSession(
    history,
    moves,
    audios,
    speed,
    isSongActive
  )

  const [video, setVideo] = useState({})

  return (
    <>
      {video.url && (
        <Overlay fullCovered={video.url}>
          <IconButton
            onClick={() => setVideo({})}
            className="top-right"
            color={'text'}
            size={'md'}
          >
            <CancelIcon />
          </IconButton>
          <YoutubeVideo video={video} />
        </Overlay>
      )}
      <AppHeader cols={isPlaying ? '000' : '110'}>
        {!isPlaying && (
          <IconButton
            onClick={sessionHandler.stop}
            color={'tertiary'}
            size={'md'}
          >
            <StopIcon />
          </IconButton>
        )}
        {!isPlaying && <h1>Pause</h1>}
      </AppHeader>
      <main className="dark no-bg-img">
        <Overlay paused={!isPlaying}>
          {currentMove._id && <CurrentMove name={currentMove.name} />}
          {!isPlaying && <SelectedMoveList moves={moves} onClick={setVideo} />}
        </Overlay>
        <BackgroundVideo isPlaying={isPlaying} />
      </main>
      <AppFooter>
        <IconButton
          onClick={isPlaying ? sessionHandler.pause : sessionHandler.play}
          color={'tertiary'}
          size={'lg'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </IconButton>
      </AppFooter>
    </>
  )
}
