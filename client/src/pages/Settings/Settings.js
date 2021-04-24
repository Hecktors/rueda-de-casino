import { useContext } from 'react'
import styled from 'styled-components/macro'
import useUserInput from './useUserInput'
import { Context } from '../../context/Context'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import InputRunThroughSelection from './InputRunThroughSelection'
import InputPlaySong from './InputPlaySong'
import InputSongSpeed from './InputSongSpeed'

export default function Settings() {
  const { appState, setAppState } = useContext(Context)
  const { updateAppState } = useUserInput(appState, setAppState)

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
        </form>
      </MainStyled>
      <footer>
        <Navigation />
      </footer>
    </>
  )
}

const MainStyled = styled.main`
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
  .form-group-container {
    /* height: 130px; */
  }
  .btn-update {
    width: 50%;
    margin: 50px 0;
  }
`
