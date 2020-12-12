import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import AppHeader from '../app/AppHeader'
import AppFooter from '../app/AppFooter'
import IconButton from '../app/Buttons/IconButton'
import InputLevel from './InputLevel/InputLevel'
import InputPlaySong from './InputPlaySong/InputPlaySong'
import InputSongSpeed from './InputSongSpeed/InputSongSpeed'
import { ResetIcon, EditIcon, PlayIcon } from '../app/Icons/Icons'

Home.propTypes = {
  history: PropTypes.object.isRequired,
  levels: PropTypes.array.isRequired,
  appState: PropTypes.object.isRequired,
  updateAppState: PropTypes.func.isRequired,
  resetAppState: PropTypes.func.isRequired,
}

export default function Home({
  history,
  levels,
  appState,
  resetAppState,
  updateAppState,
}) {
  const { selectedMoveIDs, speed, isSongActive } = appState
  const hasNotEnoughMoves = selectedMoveIDs.length < 2

  return (
    <>
      <AppHeader cols="111">
        <IconButton
          onClick={resetAppState}
          color={'tertiary'}
          size={'md'}
          disabled={selectedMoveIDs.length === 0}
        >
          <ResetIcon />
        </IconButton>
        <h1 className="logo">Salsa time!</h1>
        <IconButton
          onClick={() => history.push('/update')}
          color={'tertiary'}
          size={'sm'}
        >
          <EditIcon />
        </IconButton>
      </AppHeader>

      <MainStyled>
        <form>
          <div className="level-container">
            {levels.map(({ id, name, moves }) => (
              <InputLevel
                key={id}
                levelName={name}
                levelMoves={moves}
                selectedMoveIDs={selectedMoveIDs}
                updateAppState={updateAppState}
              />
            ))}
          </div>
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
        </form>
      </MainStyled>

      <AppFooter
        msg={hasNotEnoughMoves ? 'Select at least 2 moves to start' : ''}
      >
        <IconButton
          onClick={() => history.push('/session')}
          color={'tertiary'}
          size={'lg'}
          disabled={hasNotEnoughMoves}
        >
          <PlayIcon />
        </IconButton>
      </AppFooter>
    </>
  )
}

const MainStyled = styled.main`
  padding: 10px;
  .level-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 5px;
  }

  .btn-update {
    width: 50%;
    margin: 50px 0;
  }
`
