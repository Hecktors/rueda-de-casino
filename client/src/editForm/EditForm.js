import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Button from '../app/Buttons/Button'
import useUserInput from './useUserInput'
import IconButton from '../app/Buttons/IconButton'
import { DeleteIcon, ResetIcon } from '../app/Icons/Icons'

EditForm.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  pensum: PropTypes.array.isRequired,
  addMove: PropTypes.func.isRequired,
  updateMove: PropTypes.func.isRequired,
  deleteMove: PropTypes.func.isRequired,
}

export default function EditForm({
  match,
  history,
  pensum,
  addMove,
  updateMove,
  deleteMove,
}) {
  const id = match.params.id || ''
  const [isLevelInputDisplayed, setIsLevelInputDisplayed] = useState(
    !pensum.length
  )
  const [userInput, updateUserInput, resetUserInput] = useUserInput(
    pensum,
    id,
    setIsLevelInputDisplayed
  )

  async function handleSubmit(e, moveToDelID) {
    e.preventDefault()
    const isNewMove = !userInput._id
    if (moveToDelID) {
      deleteMove(moveToDelID)
    } else {
      isNewMove ? addMove(userInput) : updateMove(userInput)
    }
  }

  return (
    <EditFormStyled onSubmit={handleSubmit}>
      <IconButton
        type={'button'}
        onClick={resetUserInput}
        color={'tertiary'}
        size={'md'}
        className="top-left"
      >
        <ResetIcon />
      </IconButton>
      <h2>
        <span>{userInput.name}</span>
      </h2>
      {id && (
        <IconButton
          type="button"
          onClick={(e) => handleSubmit(e, id)}
          color={'tertiary'}
          size={'md'}
          className="top-right"
        >
          <DeleteIcon />
        </IconButton>
      )}

      <div className="form-group-container">
        <div className="form-group select">
          <label htmlFor="">level</label>
          <select
            onChange={updateUserInput}
            name="levelName"
            id="levelName"
            value={userInput.levelName}
            required
          >
            {pensum.map(({ id, levelName }) => (
              <option key={id} value={levelName}>
                {levelName}
              </option>
            ))}
            <option value="createLevel">CREATE NEW LEVEL</option>
          </select>
        </div>
        {isLevelInputDisplayed && (
          <div className="form-group">
            <label htmlFor="">Level Name</label>
            <input
              onChange={updateUserInput}
              value={userInput.levelName}
              type="text"
              id="levelName"
              name="levelName"
              required
            />
          </div>
        )}
      </div>

      <div className="form-group-container">
        <div className="form-group">
          <label htmlFor="">Move Name</label>
          <input
            onChange={updateUserInput}
            value={userInput.name}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="">Num of Bars</label>
          <input
            className="tar"
            onChange={updateUserInput}
            value={userInput.bars}
            type="number"
            id="bars"
            name="bars"
            required
          />
        </div>
      </div>

      <div className="form-group-container">
        <div className="form-group">
          <label htmlFor="">Youtube Video Link</label>
          <input
            onChange={updateUserInput}
            value={userInput.videoUrl}
            type="text"
            id="videoUrl"
            name="videoUrl"
            placeholder="https://www.youtube.com/watch?v=b4jaXaC1P04"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Start At Sec</label>
          <input
            className="tar"
            onChange={updateUserInput}
            value={userInput.videoStart}
            type="text"
            id="videoStart"
            name="videoStart"
            placeholder="00:15"
          />
        </div>
      </div>

      <div className="button-container">
        <Button
          onClick={() => {
            history.push('/edit-overview')
          }}
          color={'tertiary'}
          size={'lg'}
          outlined
        >
          Cancel
        </Button>
        <Button onClick={() => {}} color={'primary'} size={'lg'}>
          Save
        </Button>
      </div>
    </EditFormStyled>
  )
}

const EditFormStyled = styled.form`
  position: absolute;
  top: 15px;
  right: 15px;
  bottom: 15px;
  left: 15px;
  z-index: 9999;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 6px -6px white;
  box-shadow: 0 2.8px 2.2px rgba(200, 200, 200, 0.034),
    0 6.7px 5.3px rgba(200, 200, 200, 0.048),
    0 12.5px 10px rgba(200, 200, 200, 0.06),
    0 22.3px 17.9px rgba(200, 200, 200, 0.072),
    0 41.8px 33.4px rgba(200, 200, 200, 0.086),
    0 100px 80px rgba(200, 200, 200, 0.12);

  h2 {
    text-align: center;
    font-size: 1.3rem;
    span {
      color: var(--color-primary);
    }
  }

  label {
    display: block;
  }

  input,
  select {
    width: 100%;
    padding: 3px 10px;
    font-size: 1rem;
  }

  select {
    background-color: var(--color-text);
  }

  option {
    text-align: center;
  }

  .form-group-container {
    display: flex;
    gap: 20px;
    &:first-of-type {
      margin-top: 40px;
    }

    &:first-of-type {
      display: block;
    }
  }
  .form-group {
    margin: 30px 0;
  }

  .form-group:first-of-type {
    width: 130%;

    &.select {
      width: 100%;
    }
  }

  .button-container {
    position: fixed;
    bottom: 40px;
    left: 30px;
    right: 30px;
    display: flex;
    justify-content: space-evenly;
  }
`
