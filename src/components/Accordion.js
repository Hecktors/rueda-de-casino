import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { ReactComponent as ArrowRightIcon } from '../assets/img/arrow_right.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/img/arrow_down.svg'

LevelAccordion.propTypes = {
  name: PropTypes.string.isRequired,
  moves: PropTypes.array.isRequired,
  selectedMoves: PropTypes.array.isRequired,
  userInput: PropTypes.array.isRequired,
  updateUserInput: PropTypes.func.isRequired,
}

export default function LevelAccordion({
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
        <span className="level-name">{name.toUpperCase()}</span>
      </h3>
      <ul>{listItems}</ul>
    </LevelAccordionStyled>
  )
}

const LevelAccordionStyled = styled.div`
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: var(--bg-color-accordion);

  input {
    display: none;
    margin-right: 5px;
  }

  h3 {
    font-size: 1rem;
    padding: 0;
    display: flex;
    justify-content: space-between;

    & .level-name {
      flex-grow: 1;
      font-size: inherit;
      font-weight: normal;
      text-align: center;
    }

    svg {
      transform: scale(2);
    }
  }

  ul {
    overflow: hidden;
    height: ${(props) => (props.isOpen ? 'auto' : 0)};
  }

  li {
    color: var(--color-listitem);
    padding: 3px 0;

    &:first-of-type {
      padding-top: 15px;
    }

    label {
      display: inline-block;
      width: 100%;
    }
  }

  .isChecked {
    color: var(--color-listitem-active);
  }
`
