import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components/macro'
import AppContext from '../../../context/AppContext'
import useUserInput from './useUserInput'
import { ResetButton, SaveButton } from '../../../components/Buttons'
import { AddIconButton } from '../../../components/IconButtons'
import LevelAccordion from './LevelAccordion'

export default function EditForm({
  move,
  setSelectedMoveId,
  addMove,
  updateMove,
}) {
  const { userData, levels, refreshLevels, setError } = useContext(AppContext)
  const [isNewLevel, setIsNewLevel] = useState(false)
  const hasNoLevels = !levels.length
  const { token } = userData

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
      ? await addMove(token, userInput)
      : await updateMove(token, move._id, userInput)
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
        <div className="form-group">
          <label>Level</label>
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
          <label htmlFor="name">Move name*</label>
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
            className="tac"
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
            className="tac"
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

      <div className="button-container">
        <ResetButton
          onClick={resetUserInput}
          disabled={hasNoChanges}
          type={'button'}
          inline
          outlined
        />
        <SaveButton
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
    display: flex;
    gap: 20px;
    max-width: 400px;
    margin: auto;

    &:first-of-type {
      padding-right: 10px;
    }
  }

  .form-group {
    display: grid;
    max-width: 400px;
    margin: 20px auto;
  }

  .form-group:first-of-type {
    width: 100%;

    &.select {
      width: 100%;
    }
  }

  .button-container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 60px;
  }
`
