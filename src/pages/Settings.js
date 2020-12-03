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
        <FormStyled>
          <div className="levels-container">
            {levels.map(({ id, name, moves }) => (
              <FormInputLevels
                key={id}
                levelName={name}
                levelMoves={moves}
                moveIDs={userInput.moveIDs}
                updateUserInput={updateUserInput}
              />
            ))}
          </div>
          <FormInputPlaySong
            isMuted={userInput.isMuted}
            hasChanged={hasIsMutedChanged}
            updateUserInput={updateUserInput}
          />
          {userInput.isMuted && (
            <FormInputSongSpeed
              hasChanged={hasSpeedChanged}
              speed={userInput.speed}
              updateUserInput={updateUserInput}
            />
          )}
        </FormStyled>
      </main>
      <footer>
        <Button onClick={() => history.push('/')} task="cancel" />
        <div />
        <Button
          onClick={handleSettingsUpdate}
          task="save"
          isPrimary
          isDisabled={hasNoChanges}
        />
      </footer>
    </Layout>
  )
}

const FormStyled = styled.form`
  padding: 5px;

  .levels-container {
    display: grid;
    align-items: start;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }
`
