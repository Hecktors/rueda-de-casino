import { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { ArrowRightIcon, ArrowDownIcon } from '../../app/Icons/Icons'

InputLevel.propTypes = {
  levelName: PropTypes.string.isRequired,
  levelMoves: PropTypes.array.isRequired,
  selectedMoveIDs: PropTypes.array.isRequired,
  updateAppState: PropTypes.func.isRequired,
}

export default function InputLevel({
  levelName,
  levelMoves,
  selectedMoveIDs,
  updateAppState,
}) {
  const [isOpen, setIsOpen] = useState()
  const hasInputMove = levelMoves.some((move) => {
    return selectedMoveIDs.includes(move._id)
  })

  function toogleInputLevel() {
    setIsOpen(!isOpen)
  }

  return (
    <InputLevelStyled isOpen={isOpen} isActive={hasInputMove}>
      <h3 onClick={toogleInputLevel}>
        {isOpen ? <ArrowDownIcon /> : <ArrowRightIcon />}{' '}
        <span className="level-name">{levelName}</span>
      </h3>
      <ul>
        {levelMoves.map((move) => (
          <li key={move._id}>
            <label
              className={selectedMoveIDs.includes(move._id) ? 'isChecked' : ''}
            >
              <input
                name="move"
                value={move._id}
                onChange={updateAppState}
                type="checkbox"
                checked={selectedMoveIDs.includes(move.id)}
              />{' '}
              {move.name}
            </label>
          </li>
        ))}
      </ul>
    </InputLevelStyled>
  )
}

const InputLevelStyled = styled.div`
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
        isActive ? 'var(--color-primary)' : 'var(--color-text)'};
      flex-grow: 1;
      text-align: center;
    }

    svg {
      transform: scale(1.5);
      fill: ${({ color }) => color};
      fill: var(--color-text);
    }
  }

  ul {
    display: grid;
    gap: 3px;
    padding: 0 9px;
    overflow: hidden;
    height: ${(props) => (props.isOpen ? 'auto' : 0)};

    li {
      line-height: 1.3;

      &:first-of-type {
        padding-top: 1px;
      }
      &:last-of-type {
        padding-bottom: 10px;
      }

      label {
        width: 100%;
        display: inline-block;
        font-size: 0.875rem;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .isChecked {
      color: var(--color-primary);
    }
  }
`
