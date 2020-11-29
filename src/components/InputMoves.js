import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { ReactComponent as ArrowRightIcon } from '../assets/img/arrow_right.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/img/arrow_down.svg'

InputMoves.propTypes = {
  levelName: PropTypes.string.isRequired,
  levelMoves: PropTypes.array.isRequired,
  moveIDs: PropTypes.array.isRequired,
  updateUserInput: PropTypes.func.isRequired,
}

export default function InputMoves({
  levelName,
  levelMoves,
  moveIDs,
  updateUserInput,
}) {
  const [isOpen, setIsOpen] = useState()
  const hasInputMove = levelMoves.some((move) => {
    return moveIDs.includes(move.id)
  })

  useEffect(() => {
    !hasInputMove && isOpen && setIsOpen(false)
  }, [hasInputMove]) // eslint-disable-line react-hooks/exhaustive-deps

  const listItems = levelMoves.map((move) => (
    <li key={move.id}>
      <label className={moveIDs.includes(move.id) ? 'isChecked' : ''}>
        <input
          name="move"
          value={move.id}
          onChange={updateUserInput}
          type="checkbox"
          checked={moveIDs.includes(move.id)}
        />{' '}
        {move.name}
      </label>
    </li>
  ))

  function toogleLevelList() {
    setIsOpen(!isOpen)
  }

  return (
    <InputMovesStyled isOpen={isOpen} isActive={hasInputMove}>
      <h3 onClick={toogleLevelList}>
        {isOpen ? <ArrowDownIcon /> : <ArrowRightIcon />}{' '}
        <span className="level-name">{levelName}</span>
      </h3>
      <ul>{listItems}</ul>
    </InputMovesStyled>
  )
}

const InputMovesStyled = styled.div`
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
      text-align: center;
    }

    svg {
      transform: scale(1.5);
      fill: ${({ color }) => color};
      fill: var(--color-accordion-title);
    }
  }

  ul {
    padding: 0 9px;
    overflow: hidden;
    height: ${(props) => (props.isOpen ? 'auto' : 0)};
  }

  li {
    &:first-of-type {
      padding-top: 1px;
    }
    &:last-of-type {
      padding-bottom: 10px;
    }

    label {
      font-size: 0.875rem;
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
