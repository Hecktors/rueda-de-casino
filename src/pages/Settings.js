import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import useUserInput from '../hooks/useUserInput'
import Layout from '../layout/Layout'
import Button from '../components/Button'
import FormInputLevels from '../components/FormInputLevel'
import FormInputPlaySong from '../components/FormInputPlaySong'
import FormInputSongSpeed from '../components/FormInputSongSpeed'

Settings.propTypes = {
  history: PropTypes.object.isRequired,
  levels: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  updateSettings: PropTypes.func.isRequired,
}

export default function Settings({
  history,
  levels,
  settings,
  updateSettings,
}) {
  const [
    userInput,
    updateUserInput,
    handleInputReset,
    hasNoChanges,
    isInitState,
    hasSpeedChanged,
    hasIsMutedChanged,
  ] = useUserInput(settings)

  function handleSettingsUpdate() {
    updateSettings(userInput)
    history.push('/')
  }

  return (
    <Layout>
      <header>
        <Button
          onClick={handleInputReset}
          task="reset"
          isDisabled={isInitState}
          isSmall
        />
        <h1>Settings</h1>
        <div />
      </header>
      <main>
        <form>
          <StyledLevelsContainer>
            {levels.map(({ id, name, moves }) => (
              <FormInputLevels
                key={id}
                levelName={name}
                levelMoves={moves}
                moveIDs={userInput.moveIDs}
                updateUserInput={updateUserInput}
              />
            ))}
          </StyledLevelsContainer>
          <FormInputPlaySong
            isSongActive={userInput.isSongActive}
            hasChanged={hasIsMutedChanged}
            updateUserInput={updateUserInput}
          />
          {!userInput.isSongActive && (
            <FormInputSongSpeed
              hasChanged={hasSpeedChanged}
              speed={userInput.speed}
              updateUserInput={updateUserInput}
            />
          )}
        </form>
      </main>
      <footer>
        <Button onClick={() => history.push('/')} task="cancel" />
        <div />
        <Button
          onClick={handleSettingsUpdate}
          task="save"
          isOutlined
          isDisabled={hasNoChanges}
        />
      </footer>
    </Layout>
  )
}

const StyledLevelsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: 5px;
  padding: 5px;
`
