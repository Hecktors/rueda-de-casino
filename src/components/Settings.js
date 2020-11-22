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

  function handleReset() {
    setUserInput([])
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
    <FormStyled onSubmit={handleSubmit} onReset={handleReset} id="settings">
      {content}
    </FormStyled>
  )
}

const FormStyled = styled.form`
  width: 100%;
  height: 100%;
  padding: 10px;
  padding-top: 40px;
`
