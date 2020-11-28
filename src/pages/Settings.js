import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as ResetIcon } from '../assets/img/reset.svg'
import Layout from '../components/UI/Layout'
import LevelAccordion from '../components/Accordion'
import Header from '../components/Header'
import Button from '../components/Button'

Settings.propTypes = {
  levels: PropTypes.array.isRequired,
  selectedMoves: PropTypes.array.isRequired,
  updateSelectedMoves: PropTypes.func.isRequired,
}

export default function Settings({
  history,
  levels,
  selectedMoves,
  updateSelectedMoves,
}) {
  const [userInput, setUserInput] = useState([])
  const [selectedMovesIds, setSelectedMovesIds] = useState([])
  const hasNoChanges =
    JSON.stringify(userInput) === JSON.stringify(selectedMovesIds)
  const hasNoSelect = !userInput.length

  useEffect(() => {
    setUserInput(selectedMoves.map((move) => move.id))
    setSelectedMovesIds(selectedMoves.map((move) => move.id))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function updateUserInput(id) {
    const updatedUserInput = userInput.includes(id)
      ? userInput.filter((inputId) => inputId !== id)
      : [...userInput, id]
    setUserInput(updatedUserInput)
  }

  function handleUpdate() {
    updateSelectedMoves(userInput)
    history.push('/')
  }

  function handleReset() {
    setUserInput([])
  }

  function handleCancel() {
    history.push('/')
  }

  const content = levels.map(({ id, name, moves }) => (
    <LevelAccordion
      key={id}
      levelName={name}
      moves={moves}
      selectedMoves={selectedMoves}
      userInput={userInput}
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
        <FormStyled>{content}</FormStyled>
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
  padding: 20px;
  display: grid;
  gap: 10px;
`
