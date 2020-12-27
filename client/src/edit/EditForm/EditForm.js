import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components/macro'
import AppHeader from '../../app/components/AppHeader'
import AppFooter from '../../app/components/AppFooter'
import { CancelButton, SaveButton } from '../../app/components/buttons/Buttons'
import {
  AddIconButton,
  DeleteIconButton,
  ResetIconButton,
} from '../../app//components/buttons/IconButtons/IconButtons'
import InputLevels from './InputLevels'
import useUserInput from './useUserInput'

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
  const [isNewLevelSelected, setIsNewLevelSelected] = useState(!pensum.length)
  const [
    userInput,
    updateUserInput,
    resetUserInput,
    openNewLevelInput,
    hasNoChanges,
    isValid,
  ] = useUserInput(pensum, id, setIsNewLevelSelected)

  function handleSubmit(e, moveToDelID) {
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
      <AppHeader cols={id ? '111' : '110'}>
        <ResetIconButton
          type={'button'}
          onClick={resetUserInput}
          size={'md'}
          disabled={hasNoChanges}
        />
        <h2>EDIT</h2>
        {id && (
          <DeleteIconButton
            type="button"
            onClick={(e) => handleSubmit(e, id)}
            size={'md'}
          />
        )}
      </AppHeader>
      <main>
        <div className="form-group-container">
          <div className="form-group">
            <InputLevels
              pensum={pensum}
              selectedLevelName={userInput.levelName}
              isNewLevelSelected={isNewLevelSelected}
              updateUserInput={updateUserInput}
            />
          </div>
          <div className="form-group">
            <AddIconButton
              onClick={openNewLevelInput}
              type={'button'}
              size={'sm'}
              disabled={isNewLevelSelected}
            />
          </div>
        </div>

        {isNewLevelSelected && (
          <div className="form-group">
            <label htmlFor="">Level name</label>
            <input
              onChange={updateUserInput}
              value={userInput.levelName}
              type="text"
              id="newLevel"
              name="newLevel"
              onFocus={(e) => e.target.select()}
              onContextMenu={(e) => e.preventDefault()}
              required
            />
          </div>
        )}

        <div className="form-group-container">
          <div className="form-group">
            <label htmlFor="">Move name*</label>
            <input
              onChange={updateUserInput}
              value={userInput.name}
              type="text"
              id="name"
              name="name"
              onFocus={(e) => e.target.select()}
              onContextMenu={(e) => e.preventDefault()}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Num of bars*</label>
            <input
              className="tar"
              onChange={updateUserInput}
              value={userInput.bars}
              type="number"
              id="bars"
              name="bars"
              placeholder="0"
              onFocus={(e) => e.target.select()}
              onContextMenu={(e) => e.preventDefault()}
              required
            />
          </div>
        </div>

        <div className="form-group-container">
          <div className="form-group">
            <label htmlFor="">Youtube link</label>
            <input
              onChange={updateUserInput}
              value={userInput.videoUrl}
              type="text"
              id="videoUrl"
              name="videoUrl"
              placeholder="https://www.youtube.com/watch?v=b4jaXaC1P04"
              onFocus={(e) => e.target.select()}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Start at sec</label>
            <input
              className="tar"
              onChange={updateUserInput}
              value={userInput.videoStart}
              type="text"
              id="videoStart"
              name="videoStart"
              placeholder="00:00"
              onFocus={(e) => e.target.select()}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </main>
      <AppFooter>
        <CancelButton
          onClick={() => {
            history.push('/edit-overview')
          }}
          type={'button'}
          inline
          outlined
        />
        <SaveButton
          onClick={() => {}}
          disabled={hasNoChanges || !isValid}
          inline
        />
      </AppFooter>
    </EditFormStyled>
  )
}

const EditFormStyled = styled.form`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 9999;
  padding: 10px;
  border-radius: 5px;
  display: grid;
  flex-direction: column;
  grid-template-rows: 80px auto 80px;

  /* h2 {
    padding: 9px 0;
    text-align: center;
    font-size: 1.2rem;

    span {
      color: var(--color-primary);
    }
  } */

  label {
    display: block;
  }

  /* input,
  select {
    width: 100%;
    padding: 3px 10px;
    font-size: 1rem;
  } */

  /* option {
    text-align: center;
  } */

  .form-group-container {
    display: flex;
    max-width: 400px;
    margin: auto;
    gap: 20px;

    &:first-of-type {
      margin-top: 20px;
    }
  }

  .form-group {
    max-width: 400px;
    margin: 20px auto;
  }

  .form-group:first-of-type {
    width: 100%;

    &.select {
      width: 100%;
    }
  }
`
