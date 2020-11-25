import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import LevelAccordion from '../components/Accordion'
import Header from '../components/Header'
import Button from '../components/Button'
import { ReactComponent as CancelIcon } from '../assets/img/cancel.svg'
import { ReactComponent as ResetIcon } from '../assets/img/reset.svg'

export default function Settings({
  history,
  moves,
  selectedMoves,
  updateSelectedMoves,
}) {
  const [userInput, setUserInput] = useState([])

  useEffect(() => {
    setUserInput(selectedMoves.map((move) => move.id))
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
