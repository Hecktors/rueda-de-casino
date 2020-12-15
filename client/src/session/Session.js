import PropTypes from 'prop-types'
import { useState } from 'react'
import useSession from './useSession'
import AppFooter from '../app/AppFooter'
import AppHeader from '../app/AppHeader'
import IconButton from '../app/Buttons/IconButton'
import { CancelIcon, PauseIcon, PlayIcon, StopIcon } from '../app/Icons/Icons'
import Overlay from '../app/Overlay'
import BackgroundVideo from './BackgroundVideo/BackgroundVideo'
import CurrentMove from './CurrentMove/CurrentMove'
import SelectedMoveList from './SelectedMoveList/SelectedMoveList'
import YoutubeVideo from './YoutubeVideo/YoutubeVideo'

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
