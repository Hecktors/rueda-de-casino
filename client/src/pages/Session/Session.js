import { useState, useContext } from 'react'
import { Context } from '../../context/Context'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import useSession from './useSession'
import { CSSTransition } from 'react-transition-group'
import {
  BackIconButton,
  CancelIconButton,
  PauseIconButton,
  PlayIconButton,
} from '../../components/IconButtons'
import Overlay from '../../components/Overlay'
import BackgroundVideo from './BackgroundVideo'
import Header from '../../components/Header'
import CurrentMove from './CurrentMove'
import SelectedMoveList from './SelectedMoveList'
import YoutubeVideo from './YoutubeVideo'

export default function Session() {
  const history = useHistory()
  const { setError } = useContext(Context)
  const isOnline = window.navigator.onLine
  const isMobile = window.innerWidth <= 768

  const {
    selectedMoves,
    sessionHandler,
    isRunning,
    currentMove,
    isMoveDisplayed,
    setIsMoveDisplayed,
    toogleSessionRun,
  } = useSession(history)

  !selectedMoves.length && history.push('/')

  const [YoutubeVideoObj, setYoutubeVideoObj] = useState({})
  const isYoutubeVideoShown = !!YoutubeVideoObj.url

  const youTubeVideoOverlay = (
    <Overlay fullCovered={!!YoutubeVideoObj.url}>
      <CancelIconButton
        onClick={() => setYoutubeVideoObj({})}
        className="top-right"
        size={'md'}
        primary
      />
      <YoutubeVideo video={YoutubeVideoObj} />
    </Overlay>
  )

  const header = isRunning ? (
    <Header center={' '} />
  ) : (
    <Header
      className={`${isMobile ? 'dark-transparent' : ''}`}
      left={<BackIconButton onClick={sessionHandler.stop} size={'md'} />}
      center={<h1>Pause</h1>}
    />
  )

  if (isYoutubeVideoShown) {
    if (isOnline) {
      return youTubeVideoOverlay
    } else {
      setError('No internet connection')
      setYoutubeVideoObj(false)
    }
  }

  return (
    <>
      {header}
      <MainStyled>
        <Overlay paused={!isRunning}>
          {isRunning ? (
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
        <BackgroundVideo isRunning={isRunning} />
      </MainStyled>

      <FooterStyled
        className={`${!isRunning && isMobile ? 'dark-transparent' : ''}`}
      >
        {isRunning ? (
          <PauseIconButton onClick={toogleSessionRun} size={'xl'} primary />
        ) : (
          <PlayIconButton onClick={toogleSessionRun} size={'xl'} primary />
        )}
      </FooterStyled>
    </>
  )
}

const MainStyled = styled.main`
  overflow: hidden;

  .bg-video {
    overflow: hidden;
  }
`

const FooterStyled = styled.footer`
  position: relative;
  display: grid;
  place-items: center;
  z-index: 999;
`
