import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as ResetIcon } from '../assets/img/reset.svg'
import Layout from '../components/UI/Layout'
import InputMoves from '../components/InputMoves'
import Header from '../components/Header'
import Button from '../components/Button'
import InputMusicRadio from '../components/InputMusicRadio'

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
  const [userInput, setUserInput] = useState({
    moveIDs: [],
    speed: 2900,
    isMuted: false,
  })

  const hasNoChanges = JSON.stringify(userInput) === JSON.stringify(settings)
  const hasNoSelect = !userInput.moveIDs.length
  useEffect(() => {
    setUserInput(settings)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function updateUserInput(event) {
    const { name, value } = event.target
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
      setUserInput({ ...userInput, isMuted: value === 'true', speed: 2900 })
    }
  }

  function handleUpdate() {
    updateSettings(userInput)
    history.push('/')
  }

  function handleReset() {
    setUserInput({ ...userInput, moveIDs: [], speed: 2900, isMuted: false })
  }

  function handleCancel() {
    history.push('/')
  }

  const moveSelect = levels.map(({ id, name, moves }) => (
    <InputMoves
      key={id}
      levelName={name}
      levelMoves={moves}
      moveIDs={userInput.moveIDs}
      updateUserInput={updateUserInput}
    />
  ))

  return (
    <Layout>
      <Header>
        <Button onClick={handleReset} isDisabled={hasNoSelect} isSmall>
          <ResetIcon />
        </Button>
        <h1>Settings</h1>
        <div />
      </Header>
      <main>
        <FormStyled>
          <div className="levels-container">{moveSelect}</div>

          <InputMusicRadio
            speed={userInput.speed}
            isMuted={userInput.isMuted}
            updateUserInput={updateUserInput}
          />
        </FormStyled>
      </main>
      <footer>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          onClick={handleUpdate}
          isPrimary={true}
          isDisabled={hasNoChanges}
        >
          Save
        </Button>
      </footer>
    </Layout>
  )
}

const FormStyled = styled.form`
  padding: 5px;
  padding-bottom: 50px;

  .levels-container {
    display: grid;
    align-items: start;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }
`
