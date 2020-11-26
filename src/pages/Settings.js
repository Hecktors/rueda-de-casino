import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as CancelIcon } from '../assets/img/cancel.svg'
import { ReactComponent as ResetIcon } from '../assets/img/reset.svg'
import Layout from '../components/UI/Layout'
import LevelAccordion from '../components/Accordion'
import Header from '../components/Header'
import Button from '../components/Button'

Settings.propTypes = {
  moves: PropTypes.array.isRequired,
  selectedMoves: PropTypes.array.isRequired,
  updateSelectedMoves: PropTypes.func.isRequired,
}

export default function Settings({
  history,
  moves,
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

  function handleSubmit(e) {
    e.preventDefault()
    updateSelectedMoves(userInput)
    history.push('/')
  }

  function handleReset(e) {
    e.preventDefault()
    setUserInput([])
  }

  function handleCancel(e) {
    e.preventDefault()
    history.push('/')
  }

  const content = moves.map(({ id, name, moves }) => (
    <LevelAccordion
      key={id}
      name={name}
      moves={moves}
      selectedMoves={selectedMoves}
      userInput={userInput}
      updateUserInput={updateUserInput}
    />
  ))

  return (
    <FormStyled onSubmit={handleSubmit} onReset={handleReset} id="settings">
      <Layout>
        <Header>
          <Button onClick={handleReset} isDisabled={hasNoSelect} isSmall>
            <ResetIcon />
          </Button>
          <h1>Settings</h1>
          <Button onClick={handleCancel} isSmall>
            <CancelIcon />
          </Button>
        </Header>
        <main>{content}</main>
        <footer>
          <Button onClick={() => {}} isDisabled={hasNoChanges}>
            SAVE
          </Button>
        </footer>
      </Layout>
    </FormStyled>
  )
}

const FormStyled = styled.form`
  height: 100%;
`
