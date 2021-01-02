import { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { ArrowRightIcon, ArrowDownIcon } from '../../app/components/Icons/Icons'

InputLevels.propTypes = {
  selectedLevelName: PropTypes.string.isRequired,
  levels: PropTypes.array.isRequired,
  isNewLevel: PropTypes.bool.isRequired,
  updateUserInput: PropTypes.func.isRequired,
}

export default function InputLevels({
  selectedLevelName,
  levels,
  isNewLevel,
  updateUserInput,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ulHeight = isOpen ? 'auto' : 0
  const bdRdButtom = isOpen ? 0 : '3px'
  const header = isNewLevel ? 'New Level' : selectedLevelName.toUpperCase()
  const border = isOpen
    ? 'solid 1px var(--color-secondary)'
    : 'solid 1px transparent'

  function toogleInputLevels() {
    setIsOpen(!isOpen)
  }

  function handleChange(event) {
    setIsOpen(false)
    updateUserInput(event)
  }

  return (
    <InputLevelStyled
      ulHeight={ulHeight}
      bdRdButtom={bdRdButtom}
      border={border}
    >
      <h3 onClick={toogleInputLevels}>
        {isOpen ? <ArrowDownIcon /> : <ArrowRightIcon />}{' '}
        <span className="level-name">{header}</span>
      </h3>
      <ul>
        {levels.map(({ name: levelName }) => (
          <li key={levelName}>
            <label>
              <input
                name="levelName"
                value={levelName}
                onChange={handleChange}
                type="checkbox"
                checked={levelName === selectedLevelName ? 'isChecked' : ''}
              />
              {levelName}
            </label>
          </li>
        ))}
      </ul>
    </InputLevelStyled>
  )
}

const InputLevelStyled = styled.div`
  position: relative;

  h3 {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: ${({ border }) => border};
    border-radius: 3px;
    border-bottom-left-radius: ${({ bdRdButtom }) => bdRdButtom};
    border-bottom-right-radius: ${({ bdRdButtom }) => bdRdButtom};
    border-bottom: none;
    font-size: 1rem;
    background-color: var(--color-bg-accordion);

    & .level-name {
      width: 100%;
      color: var(--color-primary);
      text-align: center;
    }

    svg {
      transform: scale(1.5);
      fill: var(--color-text);
    }
  }

  ul {
    width: 100%;
    position: absolute;
    display: grid;
    gap: 10px;
    padding: 0 9px;
    overflow: hidden;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    height: ${({ ulHeight }) => ulHeight};
    border: ${({ border }) => border};
    border-top: none;
    background-color: var(--color-bg-accordion);

    li {
      input {
        display: none;
      }

      &:first-of-type {
        padding-top: 10px;
      }

      &:last-of-type {
        padding-bottom: 30px;
      }

      label {
        width: 100%;
        display: inline-block;
        font-size: 1rem;

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
