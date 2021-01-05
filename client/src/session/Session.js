import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import useSession from './useSession'
import { CSSTransition } from 'react-transition-group'
import AppFooter from '../app/components/MainFooter'
import AppHeader from '../app/components/AppHeader'
import Overlay from '../app/components/Overlay'
import BackgroundVideo from './BackgroundVideo'
import CurrentMove from './CurrentMove'
import SelectedMoveList from './SelectedMoveList'
import YoutubeVideo from './YoutubeVideo'
import {
  BackIconButton,
  CancelIconButton,
  PauseIconButton,
  PlayIconButton,
  StopIconButton,
} from '../app/components/buttons/IconButtons'
import AppContext from '../app/context/AppContext'

export default function Session() {
  const history = useHistory()
  const { levels, audios, appState } = useContext(AppContext)

  const [
    selectedMoves,
    sessionHandler,
    isPlaying,
    currentMove,
    isMoveDisplayed,
    setIsMoveDisplayed,
  ] = useSession(history, levels, audios, appState)

  !selectedMoves.length && history.push('/')
  const [YoutubeVideoObj, setYoutubeVideoObj] = useState({})

  return YoutubeVideoObj.url ? (
    <Overlay fullCovered={!!YoutubeVideoObj.url}>
      <CancelIconButton
        onClick={() => setYoutubeVideoObj({})}
        className="top-right"
        size={'md'}
      />
      <YoutubeVideo video={YoutubeVideoObj} />
    </Overlay>
  ) : (
      <>
        <AppHeader
          cols={isPlaying ? '000' : '110'}
          className={!isPlaying ? 'dark' : ''}
        >
          {!isPlaying && (
            <BackIconButton onClick={sessionHandler.stop} size={'md'} />
          )}
          {!isPlaying && <h1>Pause</h1>}
        </AppHeader>

        <main className="dark no-bg-img">
          <Overlay paused={!isPlaying}>
            {isPlaying ? (
              <CSSTransition
                in={isMoveDisplayed}
                timeout={2000}
                classNames="fade"
                onMountOnExit={true}
                onEntered={() => setIsMoveDisplayed(false)}
              >
                <CurrentMove name={currentMove.name} />
              </CSSTransition>
            ) : (
                <SelectedMoveList
                  moves={selectedMoves}
                  onClick={setYoutubeVideoObj}
                />
              )}
          </Overlay>
          <BackgroundVideo isPlaying={isPlaying} />
        </main>

        <AppFooter className={!isPlaying ? 'dark' : ''}>
          {isPlaying ? (
            <PauseIconButton onClick={sessionHandler.pause} size={'lg'} />
          ) : (
              <PlayIconButton onClick={sessionHandler.play} size={'lg'} />
            )}
        </AppFooter>
      </>
    )
}
