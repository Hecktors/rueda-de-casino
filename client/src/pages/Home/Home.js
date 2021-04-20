import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import AppContext from '../../context/AppContext'
import useUserInput from './useUserInput'
import { PlayIconButton, ResetIconButton } from '../../components/IconButtons'
import InputLevel from './InputLevel'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'

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
      <Header cols="110">
        <ResetIconButton
          onClick={resetAppState}
          size={'md'}
          disabled={selectedMoveIDs.length === 0}
        />
        <h1 className="logo">Salsa time!</h1>
      </Header>

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
            {hasNotEnoughMoves && <span>Select at least 2 moves to start</span>}
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
  padding: 5px;

  form {
    z-index: 1;
  }

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

  .main-footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 3rem;

    .msg {
      height: 2.5rem;
      color: var(--color-warning);
      text-align: center;
    }
  }
`
