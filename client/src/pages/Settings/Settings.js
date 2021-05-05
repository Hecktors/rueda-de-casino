import styled from 'styled-components/macro'
import useSettings from './useSettings'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import InputRunThroughSelection from './InputRunThroughSelection'
import InputPlaySong from './InputPlaySong'
import InputSongSpeed from './InputSongSpeed'
import InstallPanel from './InstallPanel'

export default function Settings() {
  const { appState, deferredPrompt, updateAppState, installApp } = useSettings()
  const { speed, isSongActive, noRepetition } = appState

  return (
    <>
      <Header />

      <MainStyled>
        <form>
          <div className="form-group-container">
            <InputPlaySong
              isSongActive={isSongActive}
              updateAppState={updateAppState}
            />
            {!isSongActive && (
              <InputSongSpeed
                isSongActive={isSongActive}
                speed={speed}
                updateAppState={updateAppState}
              />
            )}
          </div>
          <InputRunThroughSelection
            noRepetition={noRepetition}
            updateAppState={updateAppState}
          />
          {deferredPrompt && <InstallPanel onClick={installApp} />}
        </form>
      </MainStyled>
      <footer>
        <Navigation />
      </footer>
    </>
  )
}

const MainStyled = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  padding: 10px;
  padding-top: 40px;

  .level-container {
    display: grid;
    align-items: start;
    gap: 5px;
  }

  .btn-update {
    width: 50%;
    margin: 50px 0;
  }
`
