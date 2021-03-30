import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import AppContext from '../app/context/AppContext'
import useSession from './useSession'
import { CSSTransition } from 'react-transition-group'
import {
  BackIconButton,
  CancelIconButton,
  PauseIconButton,
  PlayIconButton,
} from '../app/components/buttons/IconButtons'
import Overlay from '../app/components/Overlay'
import BackgroundVideo from './BackgroundVideo'
import AppHeader from '../app/components/AppHeader'
import CurrentMove from './CurrentMove'
import SelectedMoveList from './SelectedMoveList'
import YoutubeVideo from './YoutubeVideo'

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
        primary
      />
      <YoutubeVideo video={YoutubeVideoObj} />
    </Overlay>
  ) : (
    <>
      <AppHeader
        cols={isPlaying ? '000' : '110'}
        className={`${!isPlaying ? 'dark-transparent' : ''}`}
      >
        {!isPlaying && (
          <BackIconButton onClick={sessionHandler.stop} size={'md'} />
        )}
        {!isPlaying && <h1>Pause</h1>}
      </AppHeader>

      <MainStyled className="dark no-bg-img">
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
      </MainStyled>

      <FooterStyled className={`${!isPlaying ? 'dark-transparent' : ''}`}>
        {isPlaying ? (
          <PauseIconButton onClick={sessionHandler.pause} size={'xl'} primary />
        ) : (
          <PlayIconButton onClick={sessionHandler.play} size={'xl'} primary />
        )}
      </FooterStyled>
    </>
  )
}

const MainStyled = styled.main`
  overflow-x: hidden;
`

const FooterStyled = styled.footer`
  position: relative;
  display: grid;
  place-items: center;
  z-index: 999;
`
