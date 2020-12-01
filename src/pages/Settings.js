import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as ResetIcon } from '../assets/img/reset.svg'
import Layout from '../layout/Layout'
import Button from '../components/Button'
import FormInputLevels from '../components/FormInputLevel'
import FormInputPlaySong from '../components/FormInputPlaySong'
import FormInputSongSpeed from '../components/FormInputSongSpeed'

const initState = {
  moveIDs: [],
  speed: 2900,
  isMuted: false,
}

Settings.propTypes = {
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
  const [userInput, setUserInput] = useState(initState)
  const [speedPrevVal, setSpeedPrevVal] = useState(settings.speed)
  const hasNoChanges = JSON.stringify(userInput) === JSON.stringify(settings)
  const isInitState = JSON.stringify(userInput) === JSON.stringify(initState)
  const hasSpeedChanged = userInput.speed !== speedPrevVal
  const hasIsMutedChanged =
    userInput.isMuted !== settings.isMuted && !isInitState

  useEffect(() => {
    setUserInput(settings)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function updateUserInput(event) {
    const { name, value, checked } = event.target

    if (name === 'move') {
      const updatedMoveIDs = userInput.moveIDs.includes(value)
        ? userInput.moveIDs.filter((moveID) => moveID !== value)
        : [...userInput.moveIDs, value]
      setUserInput({ ...userInput, moveIDs: updatedMoveIDs })
    }
    if (name === 'speed') {
      setUserInput({ ...userInput, speed: Number(value) })
    }

    if (name === 'isMuted') {
      setUserInput({ ...userInput, isMuted: !checked })
    }
  }

  function handleUpdate() {
    updateSettings(userInput)
    history.push('/')
  }

  function handleReset() {
    setUserInput(initState)
    setSpeedPrevVal(initState.speed)
  }

  function handleCancel() {
    history.push('/')
  }

  const moveSelect = levels.map(({ id, name, moves }) => (
    <FormInputLevels
      key={id}
      levelName={name}
      levelMoves={moves}
      moveIDs={userInput.moveIDs}
      updateUserInput={updateUserInput}
    />
  ))

  return (
    <Layout>
      <header>
        <Button onClick={handleReset} isDisabled={isInitState} isSmall>
          <ResetIcon />
        </Button>
        <h1>Settings</h1>
        <div />
      </header>
      <main>
        <FormStyled>
          <div className="levels-container">{moveSelect}</div>
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
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleUpdate} isPrimary isDisabled={hasNoChanges}>
          Save
        </Button>
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
