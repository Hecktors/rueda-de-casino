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
      <h2>Edit {userInput.name}</h2>
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

      {!isLevelInputDisplayed && (
        <div className="form-group">
          <label htmlFor="">level name</label>
          <select
            onChange={updateUserInput}
            name="levelName"
            id="levelName"
            value={userInput.levelName}
            required
          >
            <option value="">Choose the level</option>
            {pensum.map(({ id, levelName }) => (
              <option key={id} value={levelName}>
                {levelName}
              </option>
            ))}
            <option value="createLevel">CREATE NEW LEVEL</option>
          </select>
        </div>
      )}

      {isLevelInputDisplayed && (
        <div className="form-group">
          <label htmlFor="">level name</label>
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
      {/* <div className="form-group-container"> */}

      <div className="form-group">
        <label htmlFor="">move name</label>
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
        <label htmlFor="">num of bars</label>
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

      {/* </div> */}
      {/* <div className="form-group-container"> */}
      <div className="form-group">
        <label htmlFor="">Youtube video link</label>
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
        <label htmlFor="">start at</label>
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
      {/* </div> */}
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
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #fff;
  background-color: var(--color-bg);

  display: flex;
  flex-direction: column;
  gap: 20px;
  /* justify-items: stretch; */

  .form-group {
    grid-column-start: 1;
    grid-column-end: 8;
  }
  .form-group:nth-of-type(1) {
    grid-row-start: row1-start;
    grid-row-end: 3;
  }
  h2 {
    text-align: center;
  }
  label {
    display: block;
  }

  input {
    width: 100%;
  }

  .form-group-container {
    max-width: calc(100% - 30px);
    display: grid;
    grid-template-columns: 70% 30%;
    grid-template-rows: 60px;
  }

  .button-container {
    position: fixed;
    bottom: 40px;
    left: 30px;
    right: 30px;
    display: flex;
    justify-content: space-evenly;
    /* width: 100%; */
  }
`
