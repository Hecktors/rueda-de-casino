import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components/macro'
import { Context } from '../../../context/Context'
import useUserInput from './useUserInput'
import { BlueButton, RedButton } from '../../../components/Buttons'
import { AddIconButton } from '../../../components/IconButtons'
import LevelAccordion from './LevelAccordion'
import Input from '../../../components/Input'

export default function EditForm({
  move,
  setSelectedMoveId,
  addMove,
  updateMove,
}) {
  const { authToken, levels, refreshLevels, setError } = useContext(Context)
  const [isNewLevel, setIsNewLevel] = useState(false)
  const hasNoLevels = !levels.length

  let initLevelName = levels.length > 0 ? levels[levels.length - 1].name : ''
  if (move) initLevelName = move.levelName

  const {
    userInput,
    hasNoChanges,
    isValid,
    updateUserInput,
    resetUserInput,
    openNewLevelInput,
  } = useUserInput(move, hasNoLevels, initLevelName, setIsNewLevel)

  useEffect(() => {
    !initLevelName && setIsNewLevel(true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(e) {
    e.preventDefault()
    const isNewMove = !userInput._id
    const response = isNewMove
      ? await addMove(authToken, userInput)
      : await updateMove(authToken, move._id, userInput)
    if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      refreshLevels()
      setSelectedMoveId(null)
    }
  }

  return (
    <EditFormStyled onSubmit={handleSubmit}>
      <div className="form-group-container">
        <div className="form-group levels">
          {/* <label>Level</label> */}
          <LevelAccordion
            levels={levels}
            selectedLevelName={userInput.levelName}
            isNewLevel={isNewLevel}
            updateUserInput={updateUserInput}
          />
        </div>
        <div className="form-group">
          &nbsp;
          <AddIconButton
            onClick={openNewLevelInput}
            type={'button'}
            size={'sm'}
            disabled={isNewLevel}
          />
        </div>
      </div>

      {isNewLevel && (
        <div className="form-group-container">
          <div className="form-group">
            {/* <label htmlFor="">Level name</label> */}
            <Input
              onChange={updateUserInput}
              value={userInput.levelName}
              type="text"
              placeholder="Level Name"
              id="newLevel"
              name="newLevel"
              onFocus={(e) => e.target.select()}
              onContextMenu={(e) => e.preventDefault()}
              required
            />
          </div>
        </div>
      )}

      <div className="form-group-container">
        <div className="form-group">
          {/* <label htmlFor="name">Move name*</label> */}
          <Input
            onChange={updateUserInput}
            value={userInput.name}
            type="text"
            name="name"
            placeholder="Move Name*"
            onFocus={(e) => e.target.select()}
            onContextMenu={(e) => e.preventDefault()}
            required
          />
        </div>

        <div className="form-group">
          {/* <label htmlFor="">Rounds*</label> */}
          <Input
            className="tac"
            onChange={updateUserInput}
            value={userInput.bars}
            type="number"
            placeholder="Rounds"
            name="bars"
            onFocus={(e) => e.target.select()}
            onContextMenu={(e) => e.preventDefault()}
            required
          />
        </div>
      </div>

      <div className="form-group-container">
        <div className="form-group">
          {/* <label htmlFor="">Youtube link</label> */}
          <Input
            onChange={updateUserInput}
            value={userInput.videoUrl}
            type="text"
            name="videoUrl"
            placeholder="https://www.youtube.com/watch?v=b4jaXaC1P04"
            onFocus={(e) => e.target.select()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="">Start at</label> */}
          <Input
            className="tac"
            onChange={updateUserInput}
            value={userInput.videoStart}
            type="text"
            name="videoStart"
            placeholder="Start At"
            onFocus={(e) => e.target.select()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>

      <div className="button-container">
        <BlueButton
          text="Reset"
          onClick={resetUserInput}
          disabled={hasNoChanges}
          type={'button'}
          inline
          outlined
        />
        <RedButton
          text="Save"
          onClick={() => {}}
          disabled={hasNoChanges || !isValid}
          inline
        />
      </div>
    </EditFormStyled>
  )
}

const EditFormStyled = styled.form`
  height: 100%;

  .form-group-container {
    display: grid;
    gap: 30px;
    max-width: 400px;
    margin: auto;
    grid-template-columns: 3fr 1fr;
  }

  .form-group {
    max-width: 400px;
    margin: 20px auto;

    &.levels {
      width: 100%;
    }
  }

  .form-group:first-of-type {
    &.select {
      width: 100%;
    }
  }

  label {
    margin-bottom: 5px;
  }

  .button-container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
  }
`
