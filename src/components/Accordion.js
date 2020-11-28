import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { ReactComponent as ArrowRightIcon } from '../assets/img/arrow_right.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/img/arrow_down.svg'

LevelAccordion.propTypes = {
  levelName: PropTypes.string.isRequired,
  moves: PropTypes.array.isRequired,
  selectedMoves: PropTypes.array.isRequired,
  userInput: PropTypes.array.isRequired,
  updateUserInput: PropTypes.func.isRequired,
}

export default function LevelAccordion({
  levelName,
  moves,
  selectedMoves,
  userInput,
  updateUserInput,
}) {
  const selectedMoveIds = selectedMoves.map((move) => move.id)
  const hasSelectedMove = moves.some((move) =>
    selectedMoveIds.includes(move.id)
  )

  const [isOpen, setIsOpen] = useState()

  useEffect(() => {
    hasSelectedMove && setIsOpen(true)
  }, [hasSelectedMove])

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
    <LevelAccordionStyled isOpen={isOpen}>
      <h3 onClick={toogleLevelList}>
        {isOpen ? <ArrowDownIcon /> : <ArrowRightIcon />}{' '}
        <span className="level-name">{levelName}</span>
      </h3>
      <ul>{listItems}</ul>
    </LevelAccordionStyled>
  )
}

const LevelAccordionStyled = styled.div`
  width: 100%;
  border-radius: 5px;
  background-color: var(--bg-color-accordion);

  input {
    display: none;
  }

  h3 {
    cursor: pointer;
    font-size: 1rem;
    padding: 6px;
    display: flex;
    justify-content: space-between;
    color: var(--color-accordion-title);

    & .level-name {
      flex-grow: 1;
      font-size: inherit;
      font-weight: normal;
      text-align: center;
    }

    svg {
      transform: scale(1.5);
      fill: var(--color-accordion-title);
    }
  }

  ul {
    padding: 0 10px;
    overflow: hidden;
    height: ${(props) => (props.isOpen ? 'auto' : 0)};
  }

  li {
    &:first-of-type {
      padding-top: 5px;
    }
    &:last-of-type {
      padding-bottom: 5px;
    }

    label {
      color: var(--color-accordion-item);
      display: inline-block;
      width: 100%;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .isChecked {
    color: var(--color-accordion-item-active);
  }
`
