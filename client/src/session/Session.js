import PropTypes from 'prop-types'
import { useState } from 'react'
import useSession from './useSession'
import { CSSTransition } from 'react-transition-group'
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
  const [
    sessionHandler,
    isPlaying,
    currentMove,
    isMoveDisplayed,
    setIsMoveDisplayed,
  ] = useSession(history, moves, audios, speed, isSongActive)

  const [YoutubeVideoObj, setYoutubeVideoOjb] = useState({})

  return YoutubeVideoObj.url ? (
    <Overlay fullCovered={!!YoutubeVideoObj.url}>
      <CancelIconButton
        onClick={() => setYoutubeVideoOjb({})}
        className="top-right"
        color={'text'}
        size={'md'}
      />
      <YoutubeVideo video={YoutubeVideoObj} />
    </Overlay>
  ) : (
    <>
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
          <CSSTransition
            in={isMoveDisplayed}
            timeout={4000}
            classNames="fade"
            unmountOnExit
            onMountOnExit={true}
            onEntered={() => setIsMoveDisplayed(false)}
          >
            <CurrentMove name={currentMove.name} />
          </CSSTransition>
          {!isPlaying && (
            <SelectedMoveList moves={moves} onClick={setYoutubeVideoOjb} />
          )}
        </Overlay>
        <BackgroundVideo isPlaying={isPlaying} />
      </main>

      <AppFooter>
        {isPlaying ? (
          <PauseIconButton
            onClick={sessionHandler.pause}
            color={'tertiary'}
            size={'lg'}
          />
        ) : (
          <PlayIconButton
            onClick={sessionHandler.play}
            color={'tertiary'}
            size={'lg'}
          />
        )}
      </AppFooter>
    </>
  )
}
