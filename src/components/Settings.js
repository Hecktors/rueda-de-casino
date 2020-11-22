import { useState, useEffect } from 'react'
import styled from 'styled-components'
import LevelDropDown from './LevelDropDown'

export default function Settings({
  pensum,
  selectedMoves,
  updateSelectedMoves,
}) {
  const [userInput, setUserInput] = useState([])

  useEffect(() => {
    setUserInput(selectedMoves.map(({ id }) => id))
  }, [selectedMoves])

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
    <LevelDropDown
      key={id}
      name={name}
      moves={moves}
      selectedMoves={selectedMoves}
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
