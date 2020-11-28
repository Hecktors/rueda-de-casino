import { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { ReactComponent as ArrowRightIcon } from '../assets/img/arrow_right.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/img/arrow_down.svg'

LevelAccordion.propTypes = {
  levelName: PropTypes.string.isRequired,
  moves: PropTypes.array.isRequired,
  userInput: PropTypes.array.isRequired,
  updateUserInput: PropTypes.func.isRequired,
}

export default function LevelAccordion({
  levelName,
  moves,
  userInput,
  updateUserInput,
}) {
  const [isOpen, setIsOpen] = useState()
  const hasInputMove = moves.some((move) => userInput.includes(move.id))

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
    <LevelAccordionStyled isOpen={isOpen} isActive={hasInputMove}>
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
  background-color: var(--bg-color-accordion);
  border-radius: 5px;

  input {
    display: none;
  }

  h3 {
    cursor: pointer;
    font-size: 1rem;
    padding: 7px;
    display: flex;
    justify-content: space-between;

    & .level-name {
      color: ${({ isActive }) =>
        isActive
          ? 'var(--color-accordion-title-active)'
          : 'var(--color-accordion-title)'};
      flex-grow: 1;
      font-size: inherit;
      font-weight: normal;
      text-align: center;
    }

    svg {
      transform: scale(1.5);
      fill: ${({ color }) => color};
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
