import { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as ArrowUpIcon } from '../assets/img/arrow_up.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/img/arrow_down.svg'

export default function LevelForm({
  name,
  moves,
  selectedMoves,
  userInput,
  updateUserInput,
}) {
  const selectedMoveIds = selectedMoves.map((move) => move.id)
  const hasSelectedMove = moves.some((move) =>
    selectedMoveIds.includes(move.id)
  )

  const [isOpen, setIsOpen] = useState(hasSelectedMove)

  const listItems = moves.map((move) => (
    <li key={move.id}>
      <label className={userInput.includes(move.id) ? 'isChecked' : ''}>
        <input
          onChange={() => updateUserInput(move.id)}
          type="checkbox"
          checked={userInput.includes(move.id)}
        />{' '}
        {move.name}
      </label>
    </li>
  ))

  function toogleLevelList() {
    setIsOpen(!isOpen)
  }

  return (
    <LevelsStyled isOpen={isOpen}>
      <h3 onClick={toogleLevelList}>
        {name.toUpperCase()}
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}{' '}
      </h3>
      <ul>{listItems}</ul>
    </LevelsStyled>
  )
}

const LevelsStyled = styled.div`
  font-size: 1.1rem;
  margin-bottom: 10px;

  input {
    margin-right: 5px;
  }

  h3 {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    font-size: inherit;
    svg {
      transform: scale(2);
    }
  }
  ul {
    overflow: hidden;
    transition: 1s;
    height: ${(props) => (props.isOpen ? 'auto' : 0)};
  }
  li {
    padding: 3px 0;

    label {
      display: inline-block;
      width: 100%;
    }
  }

  .isChecked {
    color: var(--color-selected);
  }
`
