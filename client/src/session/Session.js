import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
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
  speed: PropTypes.number,
  isSongActive: PropTypes.bool.isRequired,
}

export default function Session({
  history,
  moves,
  speed,
  isSongActive,
  setPlaymode,
}) {
  const [sessionHandler, isPlaying, currentMove] = useSession(
    history,
    moves,
    speed,
    isSongActive,
    setPlaymode
  )

  !moves.length && history.push('/')
  const [video, setVideo] = useState({})

  return (
    <>
      {video.id && (
        <Overlay full>
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
      <StyledMain className="dark no-bg-img">
        <BackgroundVideo isPlaying={isPlaying} />
        <Overlay paused={!isPlaying}>
          {currentMove.id && <CurrentMove name={currentMove.name} />}
          {!isPlaying && <SelectedMoveList moves={moves} onClick={setVideo} />}
        </Overlay>
      </StyledMain>
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

const StyledMain = styled.main`
  /* height: calc(100% * 0.75); */
  /* display: grid; */
  place-items: center;
  .bg-video {
    position: fixed;
    top: 50%;
    transform: translateY(-50%) scale(1);
    left: 0;
    z-index: 0;
    filter: blur(5px);
  }
`
