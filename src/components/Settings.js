import { useState } from 'react'
import styled from 'styled-components'
import LevelForm from './LevelForm'

export default function Settings({ pensum, updateSelectedMoves }) {
  const [userInput, setUserInput] = useState([])
  console.log('userInput:', userInput)

  function updateUserInput(id) {
    const updatedUserInput = userInput.includes(id)
      ? userInput.filter((inputId) => inputId !== id)
      : [...userInput, id]
    setUserInput(updatedUserInput)
  }

  function handleSubmit(e) {
    e.preventDefault()

    updateSelectedMoves(userInput)
  }

  const content = pensum.map(({ id, name, moves }) => (
    <LevelForm
      key={id}
      name={name}
      moves={moves}
      userInput={userInput}
      updateUserInput={updateUserInput}
    />
  ))

  return (
    <SettingsStyled onSubmit={handleSubmit} id="settings">
      {content}
    </SettingsStyled>
  )
}

const SettingsStyled = styled.form`
  width: 100%;
  height: 100%;
  padding: 20px;
`
