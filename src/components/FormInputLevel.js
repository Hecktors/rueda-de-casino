import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { ArrowRightIcon, ArrowDownIcon } from '../components/Icons'

FormInputLevel.propTypes = {
  levelName: PropTypes.string.isRequired,
  levelMoves: PropTypes.array.isRequired,
  selectedMoveIDs: PropTypes.array.isRequired,
  updateUserInput: PropTypes.func.isRequired,
}

export default function FormInputLevel({
  levelName,
  levelMoves,
  selectedMoveIDs,
  updateUserInput,
}) {
  const [isOpen, setIsOpen] = useState()
  const hasInputMove = levelMoves.some((move) => {
    return selectedMoveIDs.includes(move.id)
  })

  useEffect(() => {
    !hasInputMove && isOpen && setIsOpen(false)
  }, [hasInputMove]) // eslint-disable-line react-hooks/exhaustive-deps

  const listItems = levelMoves.map((move) => (
    <li key={move.id}>
      <label className={selectedMoveIDs.includes(move.id) ? 'isChecked' : ''}>
        <input
          name="move"
          value={move.id}
          onChange={updateUserInput}
          type="checkbox"
          checked={selectedMoveIDs.includes(move.id)}
        />{' '}
        {move.name}
      </label>
    </li>
  ))

  function toogleFormInputLevel() {
    setIsOpen(!isOpen)
  }

  return (
    <FormInputLevelStyled isOpen={isOpen} isActive={hasInputMove}>
      <h3 onClick={toogleFormInputLevel}>
        {isOpen ? <ArrowDownIcon /> : <ArrowRightIcon />}{' '}
        <span className="level-name">{levelName}</span>
      </h3>
      <ul>{listItems}</ul>
    </FormInputLevelStyled>
  )
}

const FormInputLevelStyled = styled.div`
  background-color: var(--color-bg-accordion);
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
        isActive ? 'var(--color-primary)' : 'var(--color-secondary)'};
      flex-grow: 1;
      text-align: center;
    }

    svg {
      transform: scale(1.5);
      fill: ${({ color }) => color};
      fill: var(--color-secondary);
    }
  }

  ul {
    line-height: 1.7;
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
      color: var(--color-secondary);
      display: inline-block;
      width: 100%;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .isChecked {
    color: var(--color-primary);
  }
`
