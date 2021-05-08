import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { device } from '../../../styles/device'
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
  const isDesktop = window.innerWidth >= 1024
  const hasInputMove = levelMoves.some((move) =>
    selectedMoveIds.includes(move._id)
  )
  const color =
    hasInputMove && !isDesktop ? 'var(--color-text-active)' : 'transparent'
  const ulHeight = isOpen ? 'auto' : 0
  const headerSize = isDesktop ? '1.2rem' : '0.875rem'

  useEffect(() => {
    isDesktop ? setIsOpen(true) : !selectedMoveIds.length && setIsOpen(false)
  }, [selectedMoveIds]) // eslint-disable-line react-hooks/exhaustive-deps

  function toogleInputLevel() {
    !isDesktop && setIsOpen(!isOpen)
  }

  return (
    <InputLevelStyled
      isOpen={isOpen}
      color={color}
      ulHeight={ulHeight}
      headerSize={headerSize}
    >
      <h2 onClick={toogleInputLevel}>
        {!isDesktop && (isOpen ? <ArrowDownIcon /> : <ArrowRightIcon />)}{' '}
        <span className="level-name">{levelName}</span>
        <span className="checkmark">✔</span>
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
    font-size: ${({ headerSize }) => headerSize};

    .level-name {
      width: 100%;
      text-transform: uppercase;
      text-align: center;
      color: var(--color-text);
    }

    .checkmark {
      color: ${({ color }) => color};
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
        height: 100%;
        padding: 0;
        width: 100%;
        display: inline-block;
        font-size: 0.875rem;

        @media ${device.laptop} {
          &:hover {
            cursor: pointer;
            opacity: 0.5;
          }
        }
      }
    }

    .isChecked {
      color: var(--color-text-active);
    }
  }
`
