import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ArrowRightIcon, ArrowDownIcon } from '../../../components/Icons/Icons'

InputLevel.propTypes = {
  levelName: PropTypes.string.isRequired,
  levelMoves: PropTypes.array.isRequired,
  selectedMoveIds: PropTypes.array.isRequired,
  updateAppState: PropTypes.func.isRequired,
}

export default function InputLevel({
  levelName,
  levelMoves,
  selectedMoveIds,
  updateAppState,
}) {
  const [isOpen, setIsOpen] = useState()
  const hasInputMove = levelMoves.some((move) =>
    selectedMoveIds.includes(move._id)
  )
  const color = hasInputMove
    ? 'var(--color-primary-lighter)'
    : 'var(--color-text)'
  const ulHeight = isOpen ? 'auto' : 0

  useEffect(() => {
    !selectedMoveIds.length && setIsOpen(false)
  }, [selectedMoveIds])

  function toogleInputLevel() {
    setIsOpen(!isOpen)
  }

  return (
    <InputLevelStyled isOpen={isOpen} color={color} ulHeight={ulHeight}>
      <h2 onClick={toogleInputLevel}>
        {isOpen ? <ArrowDownIcon /> : <ArrowRightIcon />}{' '}
        <span className="level-name">{levelName}</span>
      </h2>
      <ul>
        {levelMoves.map((move) => (
          <li key={move._id}>
            <label
              className={selectedMoveIds.includes(move._id) ? 'isChecked' : ''}
            >
              <input
                name="move"
                value={move._id}
                onChange={updateAppState}
                type="checkbox"
                checked={selectedMoveIds.includes(move.id)}
              />
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

  h2 {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 7px;
    font-size: 0.875rem;

    & .level-name {
      width: 100%;
      text-transform: uppercase;
      text-align: center;
      color: ${({ color }) => color};
    }

    svg {
      transform: scale(1.5);
    }
  }

  ul {
    display: grid;
    padding: 0 5px;
    overflow: hidden;
    height: ${({ ulHeight }) => ulHeight};

    li {
      line-height: 1.3;

      input {
        display: none;
      }

      &:first-of-type {
        padding-top: 5px;
      }

      &:last-of-type {
        padding-bottom: 15px;
      }

      label {
        padding: 0;
        width: 100%;
        display: inline-block;
        font-size: 0.875rem;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .isChecked {
      color: var(--color-primary-lighter);
    }
  }
`
