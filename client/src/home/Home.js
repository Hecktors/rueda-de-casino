import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import useUserInput from './useUserInput'
import AppContext from '../app/context/AppContext'
import AppHeader from '../app/components/AppHeader'
import AppFooter from '../app/components/AppFooter'
import {
  PlayIconButton,
  ResetIconButton,
  SettingsIconButton,
} from '../app/components/buttons/IconButtons'
import InputLevel from './InputLevel'
import InputPlaySong from './InputPlaySong'
import InputSongSpeed from './InputSongSpeed'

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
      <AppHeader cols="111">
        <ResetIconButton
          onClick={resetAppState}
          size={'md'}
          disabled={selectedMoveIDs.length === 0}
        />
        <h1 className="logo">Salsa time!</h1>
        <SettingsIconButton
          onClick={() => history.push('/edit-overview')}
          size={'md'}
        />
      </AppHeader>

      <MainStyled hasMultiLevels={levels.length > 1}>
        <form>
          <div className="level-container">
            {levels.map(({ name, moves }) => (
              <InputLevel
                key={name}
                levelName={name}
                levelMoves={moves}
                selectedMoveIDs={selectedMoveIDs}
                updateAppState={updateAppState}
              />
            ))}
          </div>
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

      <AppFooter
        msg={hasNotEnoughMoves ? 'Select at least 2 moves to start' : ''}
      >
        <PlayIconButton
          type={'button'}
          onClick={() => history.push('/session')}
          size={'lg'}
          disabled={hasNotEnoughMoves}
        />
      </AppFooter>
    </>
  )
}

const MainStyled = styled.main`
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
