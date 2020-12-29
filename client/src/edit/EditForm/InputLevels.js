import { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { ArrowRightIcon, ArrowDownIcon } from '../../app/components/Icons/Icons'

InputLevels.propTypes = {
  selectedLevelName: PropTypes.string.isRequired,
  isNewLevelSelected: PropTypes.bool.isRequired,
  pensum: PropTypes.array.isRequired,
  updateUserInput: PropTypes.func.isRequired,
}

export default function InputLevels({
  selectedLevelName,
  pensum,
  isNewLevelSelected,
  updateUserInput,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ulHeight = isOpen ? 'auto' : 0
  const bdRdButtom = isOpen ? 0 : '5px'
  const header = isNewLevelSelected
    ? 'New Level'
    : selectedLevelName.toUpperCase()
  function toogleInputLevels() {
    setIsOpen(!isOpen)
  }

  function handleChange(event) {
    setIsOpen(false)
    updateUserInput(event)
  }

  return (
    <InputLevelStyled
      isOpen={isOpen}
      ulHeight={ulHeight}
      bdRdButtom={bdRdButtom}
    >
      <h3 onClick={toogleInputLevels}>
        {isOpen ? <ArrowDownIcon /> : <ArrowRightIcon />}{' '}
        <span className="level-name">{header}</span>
      </h3>
      <ul>
        {pensum.map(({ _id, name: levelName }) => (
          <li key={_id}>
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
  border-radius: 5px;
  border-bottom-left-radius: ${({ bdRdButtom }) => bdRdButtom};
  border-bottom-right-radius: ${({ bdRdButtom }) => bdRdButtom};
  background-color: var(--color-bg-accordion);

  h3 {
    cursor: pointer;
    font-size: 1rem;
    padding: 10px;
    display: flex;
    justify-content: space-between;

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
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    height: ${({ ulHeight }) => ulHeight};
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
