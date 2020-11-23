import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import LevelAccordion from '../components/Accordion'
import pensum from '../data/pensum.json'
import Header from '../components/Header'
import Button from '../components/Button'
import { ReactComponent as CancelIcon } from '../assets/img/cancel.svg'
import { ReactComponent as ResetIcon } from '../assets/img/reset.svg'

import getLocalStorage from '../lib/getLocalStorage'
import setLocalStorage from '../lib/setLocalStorage'

export default function Settings(props) {
  const [selectedMoves, setSelectedMoves] = useState([])
  const [userInput, setUserInput] = useState([])

  useEffect(() => {
    const storedMove = getLocalStorage('selectedMoves') ?? []
    setSelectedMoves(storedMove)
    setUserInput(storedMove.map(({ id }) => id))
  }, [])

  function updateUserInput(id) {
    const updatedUserInput = userInput.includes(id)
      ? userInput.filter((inputId) => inputId !== id)
      : [...userInput, id]
    setUserInput(updatedUserInput)
  }

  function handleSubmit(e) {
    e.preventDefault()
    updateSelectedMoves(userInput)
    props.history.push('/')
  }

  function handleReset(e) {
    e.preventDefault()
    setUserInput([])
  }

  function handleCancel(e) {
    e.preventDefault()
    props.history.push('/')
  }

  function updateSelectedMoves(moveIds) {
    const updatedSelectedMoves = []
    pensum.forEach((level) =>
      level.moves.forEach(
        (move) => moveIds.includes(move.id) && updatedSelectedMoves.push(move)
      )
    )
    setSelectedMoves(updatedSelectedMoves)
    setLocalStorage('selectedMoves', updatedSelectedMoves)
  }

  const content = pensum.map(({ id, name, moves }) => (
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
        <Header title="Salsa time">
          <Button onClick={handleReset} isSmall>
            <ResetIcon />
          </Button>
          <h1>Settings</h1>
          <Button onClick={handleCancel} isSmall>
            <CancelIcon />
          </Button>
        </Header>
        <main>{content}</main>
        <footer>
          <Button onClick={() => {}}>SAVE</Button>
        </footer>
      </Layout>
    </FormStyled>
  )
}

const FormStyled = styled.form`
  height: 100%;
`
