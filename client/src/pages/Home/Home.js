import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { device } from '../../styles/device'
import { Context } from '../../context/Context'
import useUserInput from './useUserInput'
import { PlayIconButton, ResetIconButton } from '../../components/IconButtons'
import InputLevel from './InputLevel'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'

export default function Home() {
  const history = useHistory()
  const { levels, appState, setAppState } = useContext(Context)
  const { updateAppState, resetAppState } = useUserInput(
    levels,
    appState,
    setAppState
  )
  const { selectedMoveIds } = appState
  const hasNotEnoughMoves = selectedMoveIds.length < 2

  let levelColsNum = 1
  if (window.innerWidth >= 360) {
    levelColsNum = 2
  }
  if (window.innerWidth >= 768) {
    levelColsNum = 3
  }
  if (window.innerWidth >= 1024) {
    levelColsNum = 4
  }

  const levelCols = Array(levelColsNum)
    .fill([])
    .map((_, colIdx) => {
      return (
        <div key={colIdx} className="level-col">
          {levels
            .map(({ name, moves }) => (
              <InputLevel
                key={name}
                levelName={name}
                levelMoves={moves}
                selectedMoveIds={selectedMoveIds}
                updateAppState={updateAppState}
              />
            ))
            .filter((_, levelIdx) => {
              return levels.length > levelColsNum
                ? levelIdx % levelColsNum === colIdx
                : levelIdx === colIdx
            })}
        </div>
      )
    })

  return (
    <>
      <Header
        left={
          <ResetIconButton
            onClick={resetAppState}
            size={'md'}
            disabled={selectedMoveIds.length === 0}
          />
        }
      />

      <MainStyled>
        <div className="level-container">{levelCols}</div>
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
  display: grid;
  grid-template-rows: auto 100px;
  flex-direction: column;
  padding: 5px;
  overflow-y: hidden;

  form {
  }

  .level-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 6px;
    overflow-y: auto;

    @media ${device.mobileM} {
      grid-template-columns: 1fr 1fr;
    }

    @media ${device.tablet} {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
    }

    @media ${device.laptop} {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  .level-col {
    align-self: start;
    display: grid;
    gap: 6px;

    @media ${device.tablet} {
      gap: 12px;
    }
  }

  .form-group-container {
    height: 130px;
  }

  .main-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 3rem;

    .msg {
      min-height: 16px;
      color: var(--color-warning);
      text-align: center;
    }
  }
`
