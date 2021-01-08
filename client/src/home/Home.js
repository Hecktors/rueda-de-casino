import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import AppContext from '../app/context/AppContext'
import useUserInput from './useUserInput'
import {
  PlayIconButton,
  ResetIconButton,
} from '../app/components/buttons/IconButtons'
import InputLevel from './InputLevel'
import AppHeader from '../app/components/AppHeader'
import Navigation from '../app/components/Navigation'

export default function Home() {
  const history = useHistory()
  const { levels, appState, setAppState } = useContext(AppContext)
  const { updateAppState, resetAppState } = useUserInput(
    levels,
    appState,
    setAppState
  )
  const { selectedMoveIDs } = appState
  const hasNotEnoughMoves = selectedMoveIDs.length < 2

  return (
    <>
      <AppHeader cols="011">
        <h1 className="logo">Salsa time!</h1>
        <ResetIconButton
          onClick={resetAppState}
          size={'md'}
          disabled={selectedMoveIDs.length === 0}
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

        </form>
        <div className="main-footer">
          <div className="msg">
            {
              hasNotEnoughMoves &&
              <span>Select at least 2 moves to start</span>
            }
          </div>
          <PlayIconButton
            type={'button'}
            onClick={() => history.push('/session')}
            size={'xl'}
            disabled={hasNotEnoughMoves}
            primary
          />
        </div>
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

  .main-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .msg {
      height: 1.5rem;
      color: var(--color-warning);
      text-align: center;
    }
  }
`
