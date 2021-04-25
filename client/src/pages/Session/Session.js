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

  const [
    selectedMoves,
    sessionHandler,
    isPlaying,
    currentMove,
    isMoveDisplayed,
    setIsMoveDisplayed,
  ] = useSession(history)

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

  const header = isPlaying ? (
    <Header center={' '} />
  ) : (
    <Header
      className="dark-transparent"
      left={<BackIconButton onClick={sessionHandler.stop} size={'md'} />}
      center={<h1>Pause</h1>}
    />
  )

  if (isYoutubeVideoShown) {
    if (isOnline) {
      return youTubeVideoOverlay
    } else {
      setError('Internet connection not available')
      setYoutubeVideoObj(false)
    }
  }

  return (
    <>
      {header}
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
  overflow: hidden;
`

const FooterStyled = styled.footer`
  position: relative;
  display: grid;
  place-items: center;
  z-index: 999;
`
