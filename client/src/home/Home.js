import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import AppFooter from '../app/AppFooter'
import AppHeader from '../app/AppHeader'
import InputLevel from './InputLevel'
import InputPlaySong from './InputPlaySong'
import InputSongSpeed from './InputSongSpeed'
import {
  PlayIconButton,
  ResetIconButton,
  SettingsIconButton,
} from '../app/buttons/IconButtons'

Home.propTypes = {
  history: PropTypes.object.isRequired,
  pensum: PropTypes.array.isRequired,
  appState: PropTypes.object.isRequired,
  updateAppState: PropTypes.func.isRequired,
  resetAppState: PropTypes.func.isRequired,
}

export default function Home({
  history,
  pensum,
  appState,
  updateAppState,
  resetAppState,
}) {
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
          size={'sm'}
        />
      </AppHeader>

      <MainStyled hasMultiLevels={pensum.length > 1}>
        <form>
          <div className="level-container">
            {pensum.map(({ id, levelName, moves }) => (
              <InputLevel
                key={id}
                levelName={levelName}
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
