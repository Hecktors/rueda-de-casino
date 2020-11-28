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
    <FormStyled onSubmit={handleSubmit} onReset={handleReset} id="settings">
      <Layout>
        <Header>
          <Button onClick={handleReset} isDisabled={hasNoSelect} isSmall>
            <ResetIcon />
          </Button>
          <h1>Settings</h1>
          <div />
        </Header>
        <main>{content}</main>
        <footer>
          <Button onClick={handleCancel} color="--color-warning" isOutlined>
            {' '}
            Cancel
          </Button>
          <Button
            onClick={() => {}}
            color="--color-warning"
            isOutlined
            isDisabled={hasNoChanges}
          >
            SAVE
          </Button>
        </footer>
      </Layout>
    </FormStyled>
  )
}

const FormStyled = styled.form`
  background-color: linear-gradient(to left, #434343, #000000);
  height: 100%;

  main {
    padding: 0 20px;
    display: inline-grid;
    grid-auto-rows: max-content;
    gap: 10px;
    align-items: flex-start;
  }

  footer {
    display: flex;
    justify-content: space-evenly;
  }
`
