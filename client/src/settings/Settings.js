import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import useUserInput from './useUserInput'
import AppContext from '../app/context/AppContext'
import AppHeader from '../app/components/AppHeader'
import {
  ResetIconButton,
} from '../app/components/buttons/IconButtons'
import InputPlaySong from './InputPlaySong'
import InputSongSpeed from './InputSongSpeed'
import Navigation from '../app/components/Navigation'

export default function Home() {
  const history = useHistory()
  const { levels, appState, setAppState } = useContext(AppContext)
  const { updateAppState, resetAppState } = useUserInput(
    levels,
    appState,
    setAppState
  )
  const { selectedMoveIDs, speed, isSongActive } = appState
  const hasNotEnoughMoves = selectedMoveIDs.length < 2

  return (
    <>
      <AppHeader cols="110">
        <ResetIconButton
          onClick={resetAppState}
          size={'md'}
          disabled={selectedMoveIDs.length === 0}
        />
        <h1 className="logo">Salsa time!</h1>

      </AppHeader>

      <MainStyled hasMultiLevels={levels.length > 1}>
        <form>

          <div className="form-group-container">
            <InputPlaySong
              isSongActive={appState.isSongActive}
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
        </form>

      </MainStyled>
      <footer><Navigation /></footer>
    </>
  )
}

const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  padding: 10px;
  padding-top: 40px;

  .level-container {
    display: grid;
    grid-template-columns: ${(props) =>
    props.hasMultiLevels ? '1fr 1fr' : '1fr'};
    align-items: start;
    gap: 5px;
  }
  .form-group-container {
    height: 130px;
  }
  .btn-update {
    width: 50%;
    margin: 50px 0;
  }
`
