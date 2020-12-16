import PropTypes from 'prop-types'
import { useState } from 'react'
import useSession from './useSession'
import AppFooter from '../app/AppFooter'
import AppHeader from '../app/AppHeader'
import Overlay from '../app/Overlay'
import BackgroundVideo from './BackgroundVideo/BackgroundVideo'
import CurrentMove from './CurrentMove/CurrentMove'
import SelectedMoveList from './SelectedMoveList/SelectedMoveList'
import YoutubeVideo from './YoutubeVideo/YoutubeVideo'
import {
  CancelIconButton,
  PauseIconButton,
  PlayIconButton,
  StopIconButton,
} from '../app/buttons/IconButtons'

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
          <CancelIconButton
            onClick={() => setVideo({})}
            className="top-right"
            color={'text'}
            size={'md'}
          />
          <YoutubeVideo video={video} />
        </Overlay>
      )}
      <AppHeader cols={isPlaying ? '000' : '110'}>
        {!isPlaying && (
          <StopIconButton
            onClick={sessionHandler.stop}
            color={'tertiary'}
            size={'md'}
          />
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
        {isPlaying ? (
          <PlayIconButton
            onClick={isPlaying ? sessionHandler.pause : sessionHandler.play}
            color={'tertiary'}
            size={'lg'}
          />
        ) : (
          <PauseIconButton
            onClick={isPlaying ? sessionHandler.pause : sessionHandler.play}
            color={'tertiary'}
            size={'lg'}
          />
        )}
      </AppFooter>
    </>
  )
}
